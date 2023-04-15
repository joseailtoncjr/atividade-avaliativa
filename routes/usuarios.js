const express = require('express');
const usuarios = express.Router();
const fs = require('fs');

usuarios.route('/')

.get((req, res) => {
    res.json({mensagem: "GET realizado com sucesso"})
})
.post((req, res) => {
    const {matricula, nome, media} = req.body;

    if(!matricula || !nome || !media){
        res.status(400).json({mensagem: "Campos obrigatórios não preenchidos."});
        return;
    }
    const db = lerBancoDados();

    const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)
    console.log(alunoEncontrado);

    if(alunoEncontrado !== undefined){
        res.status(400).json({mensagem: "Este aluno já existe."});
        return;
    }

    const novoAluno = {
        matricula,
        nome,
        media
    }

    db.push(novoAluno);

    gravarBancoDados(db);

    res.status(200).json({ mensagem: "criado com sucesso" })
})

.put((req, res) => {
    res.json({mensagem: "PUT realizado com sucesso"})
})
.delete((req, res) => {
    res.json({mensagem: "DELETE realizado com sucesso"})
});

function lerBancoDados(){
    const arquivo = fs.readFileSync('./db/db.json');
    const db = JSON.parse(arquivo);
    return db;
}

function gravarBancoDados(db) {
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
}







module.exports = usuarios;