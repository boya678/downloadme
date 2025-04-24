const express = require('express');
const app = express();
const port = 3000;

const OBJECT_COUNT = parseInt(process.env.OBJECT_COUNT) || 250000;

const dataTemplate = 'x'.repeat(100); // Solo se construye una vez

function generateArray(count) {
  const bigArray = new Array(count);
  for (let i = 0; i < count; i++) {
    bigArray[i] = { index: i, data: dataTemplate };
  }
  return bigArray;
}

app.get('/hostname', (req, res) => {
  var data={
    hostame: process.env.HOSTNAME,
  }
  res.send(data);
});

// Endpoint ligero
app.get('/light', (req, res) => {
  var bigArray = generateArray(OBJECT_COUNT / 4);
  var data={
    array: bigArray
  }
  res.send(data);
});

// Endpoint con consumo alto de memoria
app.get('/heavy', (req, res) => {
  var bigArray = generateArray(OBJECT_COUNT);
  var data={
    array: bigArray
  }
  res.send(data);
});

// Endpoint con consumo alto de memoria
app.get('/mid', (req, res) => {
  var bigArray = generateArray(OBJECT_COUNT / 2);
  var data={
    array: bigArray
  }
  res.send(data);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
