# Carine Salong

Carine Salongi veebileht. Reacti/Vite'i kasutajaliides ja Hostingeri PHP-põhine broneeringuvorm.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Hostingerisse paigaldamine

1. Käivita `npm run build`.
2. Laadi kogu `dist` kausta **sisu** Hostingeri `public_html` kausta.
3. Veendu, et domeeni e-post `info@carinesalong.ee` on Hostingeris loodud.
4. Tee veebilehel proovibroneering ja kontrolli nii salongi kui kliendi postkasti (ka rämpsposti).

Broneeringud saadetakse `public/api/book.php` kaudu. Kui salongi e-posti aadress muutub, uuenda seal muutujaid `$recipient` ja `$from`, seejärel tee uus build.
