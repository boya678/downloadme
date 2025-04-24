const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Función para leer y convertir la imagen a base64
function getBase64Image(imageName) {
  const imagePath = path.join(__dirname, imageName);
  const image = fs.readFileSync(imagePath);
  return image.toString('base64');
}

// Endpoint de hostname
app.get('/hostname', (req, res) => {
  res.send({ hostname: process.env.HOSTNAME });
});

// Endpoint ligero con imagen base64
app.get('/light', (req, res) => {
  const base64Image = getBase64Image('light.jpg');
  res.send({ image: base64Image });
});

// Endpoint medio con imagen base64
app.get('/mid', (req, res) => {
  const base64Image = getBase64Image('mid.jpg');
  res.send({ image: base64Image });
});

// Endpoint pesado con imagen base64
app.get('/heavy', (req, res) => {
  const base64Image = getBase64Image('heavy.jpg');
  res.send({ image: base64Image });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
