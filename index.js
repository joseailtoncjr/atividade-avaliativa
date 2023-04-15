const express = require('express');
const usuarios = require('./routes/usuarios');

const app = express();
app.use(express.json());

app.listen(3000);