const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`My static server is running on port ${PORT}!`);
});