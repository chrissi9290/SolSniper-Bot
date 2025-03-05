const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('SolSniper Bot Backend läuft!');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
