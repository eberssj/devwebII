const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('static'));

app.get('/nicole', (req, res) => {
  res.render('nicole');
});

app.get('/jecka', (req, res) => {
  res.render('jecka');
});

app.get('/ayesha', (req, res) => {
  res.render('ayesha');
});

const port = 3000
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}/nicole`);
});