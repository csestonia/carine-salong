export const getEmailTemplateHtml = (name: string, serviceName: string, date: string, time: string, referenceId: string) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Broneeringu Kinnitus</title>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #292524;
    background-color: #f5f5f4;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border: 1px solid #e7e5e4;
  }
  .header {
    background-color: #fefce8;
    border-bottom: 2px solid #eab308;
    padding: 30px;
    text-align: center;
  }
  .header h1 {
    font-family: Georgia, serif;
    font-weight: 300;
    color: #1c1917;
    margin: 0;
    font-size: 24px;
    letter-spacing: 1px;
  }
  .header p {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ca8a04;
    margin: 10px 0 0 0;
  }
  .content {
    padding: 30px 40px;
  }
  .content p {
    margin: 0 0 15px 0;
    font-size: 14px;
    color: #44403c;
  }
  .divider {
    height: 1px;
    background-color: #e7e5e4;
    margin: 30px 0;
  }
  .details-box {
    background-color: #fafaf9;
    border: 1px solid #e7e5e4;
    padding: 20px;
    margin-bottom: 20px;
  }
  .details-title {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #ca8a04;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 1px solid #e7e5e4;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .detail-row {
    margin-bottom: 10px;
    font-size: 13px;
  }
  .detail-label {
    color: #78716c;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 3px;
  }
  .detail-value {
    color: #1c1917;
    font-weight: 500;
  }
  .footer {
    background-color: #1c1917;
    color: #fefce8;
    padding: 30px;
    text-align: center;
    font-size: 12px;
  }
  .footer p {
    margin: 5px 0;
    color: #a8a29e;
  }
  .footer a {
    color: #ca8a04;
    text-decoration: none;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Carine Salong</h1>
      <p>Bioloogiline Iluteraapia</p>
    </div>
    <div class="content">
      <p>Tere, <strong>${name}</strong>,</p>
      <p>Täname Teid usalduse eest. Oleme edukalt kätte saanud Teie broneeringusoovi Carine Salongi iluteraapiasse.</p>
      <p>See on automaatne kinnitus päringu kättesaamise kohta. <strong>Meister Karine võtab Teiega peatselt ühendust (4-12 tunni jooksul)</strong> e-kirja või SMS-i teel, et vaadata üle vabad ajad ning broneering lõplikult kinnitada.</p>
      
      <div class="divider"></div>
      
      <div class="details-box">
        <div class="details-title">
          Broneeringu info
          <span style="float: right; color: #a8a29e; font-weight: normal;">#${referenceId}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Valitud Hoolitsus</span>
          <span class="detail-value">${serviceName}</span>
        </div>
        
        <div class="detail-row" style="margin-top: 15px;">
          <span class="detail-label">Eelistatud Aeg</span>
          <span class="detail-value">${date} - ${time}</span>
        </div>
      </div>
      
      <p style="font-size: 13px; color: #78716c;">
        Kui Teil peaks tekkima lisaküsimusi või kiireloomulisi muudatusi, palun vastake sellele kirjale või helistage meile numbrile +372 506 8412.
      </p>
      <p style="font-size: 13px; color: #78716c; margin-top: 20px;">
        Soovime Teile kaunist päeva ja ootame kohtumist!<br>
        <strong>Carine Salong</strong>
      </p>
    </div>
    <div class="footer">
      <p>Carine Salong OÜ</p>
      <p>Narva mnt 12, Tallinn</p>
      <p><a href="tel:+3725068412">+372 506 8412</a> | <a href="mailto:info@carinesalong.ee">info@carinesalong.ee</a></p>
    </div>
  </div>
</body>
</html>
`;
