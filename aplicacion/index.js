const express = require('express');
const app = express();
const port = 3000;

const OBJECT_COUNT = parseInt(process.env.OBJECT_COUNT) || 250000;

app.get('/hostname', (req, res) => {
  var data={
    hostame: process.env.HOSTNAME,
  }
  res.send(data);
});

// Endpoint ligero
app.get('/light', (req, res) => {
  const bigArray = [];
  for (let i = 0; i < OBJECT_COUNT/2; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  var data={
    array: bigArray
  }
  res.send(data);
});

// Endpoint con consumo alto de memoria
app.get('/heavy', (req, res) => {
  const bigArray = [];

  for (let i = 0; i < OBJECT_COUNT; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  var data={
    array: bigArray
  }
  res.send(data);
});

// Endpoint con consumo alto de memoria
app.get('/mid', (req, res) => {
  const bigArray = [];

  for (let i = 0; i < OBJECT_COUNT/2; i++) {
    bigArray.push({ index: i, data: 'x'.repeat(100) }); // ~100 bytes en string + overhead
  }
  var data={
    array: bigArray
  }
  res.send(data);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
