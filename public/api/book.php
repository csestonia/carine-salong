<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['success' => false, 'message' => 'Lubatud on ainult POST-päring.']);
    exit;
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 20000) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'Päring on liiga suur.']);
    exit;
}

$data = json_decode($rawBody, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vigane päring.']);
    exit;
}

// Honeypot: bots usually fill hidden fields.
if (!empty($data['website'])) {
    echo json_encode(['success' => true, 'referenceId' => 'BR-' . date('ymd') . '-0000']);
    exit;
}

function clean_text(mixed $value, int $maxLength): string
{
    $text = is_string($value) ? trim($value) : '';
    $text = str_replace(["\r", "\0"], '', $text);
    return mb_substr($text, 0, $maxLength);
}

$name = clean_text($data['name'] ?? '', 100);
$email = clean_text($data['email'] ?? '', 180);
$phone = clean_text($data['phone'] ?? '', 50);
$service = clean_text($data['service'] ?? '', 200);
$date = clean_text($data['date'] ?? '', 30);
$time = clean_text($data['time'] ?? '', 80);
$notes = clean_text($data['notes'] ?? '', 2000);
$concerns = [];
if (isset($data['concerns']) && is_array($data['concerns'])) {
    foreach (array_slice($data['concerns'], 0, 10) as $concern) {
        $cleanConcern = clean_text($concern, 200);
        if ($cleanConcern !== '') {
            $concerns[] = $cleanConcern;
        }
    }
}

if ($name === '' || $phone === '' || $service === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Palun kontrollige nime, telefoni, e-posti ja teenuse välju.']);
    exit;
}

$referenceId = 'BR-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
$recipient = 'info@carinesalong.ee';
$from = 'info@carinesalong.ee';

$lines = [
    'Uus broneeringusoov Carine Salongi veebilehelt',
    '',
    'Viide: ' . $referenceId,
    'Nimi: ' . $name,
    'E-post: ' . $email,
    'Telefon: ' . $phone,
    'Teenus: ' . $service,
    'Kuupäev: ' . ($date !== '' ? $date : 'Täpsustamata'),
    'Kellaaeg: ' . ($time !== '' ? $time : 'Täpsustamata'),
    'Nahamured: ' . ($concerns ? implode('; ', $concerns) : 'Pole märgitud'),
    'Märkused: ' . ($notes !== '' ? $notes : 'Pole lisatud'),
];

$subject = '=?UTF-8?B?' . base64_encode('Uus broneeringusoov ' . $referenceId) . '?=';
$headers = [
    'From: Carine Salongi veeb <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sentToSalon = mail($recipient, $subject, implode("\n", $lines), implode("\r\n", $headers));
if (!$sentToSalon) {
    error_log('Carine booking email failed: ' . $referenceId);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server ei saanud kirja saata. Palun helistage +372 506 8412.']);
    exit;
}

$customerSubject = '=?UTF-8?B?' . base64_encode('Carine Salong – broneeringusoov vastu võetud') . '?=';
$customerMessage = implode("\n", [
    'Tere, ' . $name . '!',
    '',
    'Täname! Teie broneeringusoov on vastu võetud.',
    'Viitenumber: ' . $referenceId,
    'Teenus: ' . $service,
    '',
    'Võtame teiega ühendust, et aeg lõplikult kinnitada.',
    '',
    'Carine Salong',
    'Narva mnt 12, Tallinn',
    '+372 506 8412',
]);
$customerHeaders = [
    'From: Carine Salong <' . $from . '>',
    'Reply-To: ' . $recipient,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];
mail($email, $customerSubject, $customerMessage, implode("\r\n", $customerHeaders));

echo json_encode(['success' => true, 'referenceId' => $referenceId]);
