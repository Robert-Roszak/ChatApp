const express = require('express');
const path = require('path');
const port = 8000;
const messages = [];

const app = express();

app.use(express.static(path.join(__dirname, '/client/')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})