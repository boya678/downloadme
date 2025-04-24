const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Función para leer y convertir imagen a base64
function loadImageBase64(imageFileName) {
  const imagePath = path.join(__dirname, imageFileName);
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Precargar imágenes al iniciar
const images = {
  light: loadImageBase64('light.jpg'),
  mid: loadImageBase64('mid.jpg'),
  heavy: loadImageBase64('heavy.jpg'),
};

// Endpoint de hostname
app.get('/hostname', (req, res) => {
  res.send({ hostname: process.env.HOSTNAME });
});

// Enviar imagen precargada
app.get('/light', (req, res) => {
  res.send({ image: images.light });
});

app.get('/mid', (req, res) => {
  res.send({ image: images.mid });
});

app.get('/heavy', (req, res) => {
  res.send({ image: images.heavy });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
