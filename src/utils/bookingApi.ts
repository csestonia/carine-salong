export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  date?: string;
  time?: string;
  notes?: string;
  concerns?: string[];
  website?: string;
}

interface BookingResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
}

export async function sendBooking(data: BookingRequest): Promise<string> {
  const response = await fetch('/api/book.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let result: BookingResponse;
  try {
    result = await response.json();
  } catch {
    throw new Error('Server ei tagastanud korrektset vastust. Palun proovige uuesti või helistage +372 506 8412.');
  }

  if (!response.ok || !result.success || !result.referenceId) {
    throw new Error(result.message || 'Broneeringusoovi saatmine ebaõnnestus. Palun proovige uuesti.');
  }

  return result.referenceId;
}
