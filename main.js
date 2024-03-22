const http = require('http');
const axios = require('axios');

// Verilen URL'ye istek gönderen fonksiyon
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data.data[0]; // Veriyi içindeki 'data' dizisinin ilk elemanı olarak al
    } catch (error) {
        console.error('Hata:', error);
        return null;
    }
}

// HTTP sunucusu oluştur
const server = http.createServer(async (req, res) => {
    // Veriyi al
    const data = await fetchData('https://cz.countryzipcode.com/api/v1/fake_address/turkey/istanbul');

    // Başlık ayarla
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Veriyi HTML olarak oluştur
    let html = '<!DOCTYPE html>';
    html += '<html lang="en">';
    html += '<head><meta charset="UTF-8"><title>Adres Bilgisi</title></head>';
    html += '<body>';

    // Veriyi HTML içinde göster
    if (data) {
        html += '<h1>Alınan Veri</h1>';
        html += '<ul>';
        html += `<li><strong>Ülke:</strong> ${data.country}</li>`;
        html += `<li><strong>Şehir:</strong> ${data.state_name}</li>`;
        html += `<li><strong>Posta Kodu:</strong> ${data.zipcode}</li>`;
        html += `<li><strong>Adres:</strong> ${data.full_address}</li>`;
        html += `<li><strong>Telefon Numarası:</strong> ${data.phone_number}</li>`;
        html += `<li><strong>E-posta:</strong> ${data.email_address}</li>`;
        html += '</ul>';
    } else {
        html += '<p>Veri alınamadı.</p>';
    }

    html += '</body></html>';

    // Yanıtı gönder
    res.end(html);
});

// Sunucuyu belirtilen portta dinle
const PORT = process.env.PORT || 3131;
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor, http://localhost:${PORT}`);
});
