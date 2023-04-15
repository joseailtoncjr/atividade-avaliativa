const express = require('express');
const usuarios = express.Router();
const fs = require('fs');

usuarios.route('/')

.get((req, res) => {
    res.json({mensagem: "GET realizado com sucesso"})
})
.post((req, res) => {
    res.json({mensagem: "POST realizado com sucesso"})
})
.put((req, res) => {
    res.json({mensagem: "PUT realizado com sucesso"})
})
.delete((req, res) => {
    res.json({mensagem: "DELETE realizado com sucesso"})
});

function lerBancoDados(){ // função que retorna o banco de dados
    const arquivo = fs.readFileSync('./db/db.json'); // leitura do arquivo
    const db = JSON.parse(arquivo); // converte para objeto
    return db;
}

function gravarBancoDados(db) { // grava o array modificado em formato json no arquivo db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
}







module.exports = usuarios;