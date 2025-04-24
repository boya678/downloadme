const express = require('express');
const app = express();
const port = 3000;

const OBJECT_COUNT = parseInt(process.env.OBJECT_COUNT) || 250000;

// Endpoint ligero
app.get('/light', (req, res) => {
  const bigArray = [];

  for (let i = 0; i < OBJECT_COUNT/2; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  console.log(`Array generado con ${OBJECT_COUNT/4} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`)
  res.send(`Array generado con ${OBJECT_COUNT/4} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`);
});

// Endpoint con consumo alto de memoria
app.get('/heavy', (req, res) => {
  const bigArray = [];

  for (let i = 0; i < OBJECT_COUNT; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  console.log(`Array generado con ${OBJECT_COUNT} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`)
  res.send(`Array generado con ${OBJECT_COUNT} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`);
});

// Endpoint con consumo alto de memoria
app.get('/mid', (req, res) => {
  const bigArray = [];

  for (let i = 0; i < OBJECT_COUNT/2; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  console.log(`Array generado con ${OBJECT_COUNT/2} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`)
  res.send(`Array generado con ${OBJECT_COUNT/2} elementos (~128MB en memoria). host: ${process.env.HOSTNAME}`);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
