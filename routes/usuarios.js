const express = require('express');
const usuarios = express.Router();
const fs = require('fs');

usuarios.route('/')

    .get((req, res) => {
        const { nome, media } = req.query;
        const db = lerBancoDados();

        if(nome){
            const dbAlterado = db.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
            res.status(200)(dbAlterado);
            return;
        }

        if(media){
            const dbAlterado = db.filter(aluno => Number(aluno.media) >= Number(media));
            res.status(200)(dbAlterado);
            return;
        }

        res.status(200).json(db);


    })
    .post((req, res) => {
        const { matricula, nome, media } = req.body;

        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "Campos obrigatórios não preenchidos." });
            return;
        }
        const db = lerBancoDados();

        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)
        console.log(alunoEncontrado);

        if (alunoEncontrado !== undefined) {
            res.status(400).json({ mensagem: "Este aluno já existe." });
            return;
        };

        const novoAluno = {
            matricula,
            nome,
            media
        };

        db.push(novoAluno);

        gravarBancoDados(db);

        res.status(200).json({ mensagem: "criado com sucesso" })
    })

    .put((req, res) => {
        const { matricula, nome, media } = req.body;

        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "Campos obrigatórios não preenchidos." });
            return;
        }

        const db = lerBancoDados();

        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);

        if (!alunoEncontrado) {
            res.status(404).json({ mensagem: "Aluno inexistente." });
            return;
        }

        const dbAlterado = db.filter(aluno => aluno.matricula !== matricula);
        const alunoModificado = {
            matricula,
            nome,
            media
        }

        dbAlterado.push(alunoModificado);

        gravarBancoDados(dbAlterado);

        res.status(200).json({ mensagem: "Aluno atualizado com sucesso" })
    })
    .delete((req, res) => {
        const { matricula, nome, media } = req.body;

        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "Campos obrigatórios não preenchidos." });
            return;
        }

        const db = lerBancoDados();

        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);

        if (!alunoEncontrado) {
            res.status(404).json({ mensagem: "Aluno inexistente." });
            return;
        }

        const dbAlterado = db.filter(aluno => aluno.matricula !== matricula);
        gravarBancoDados(dbAlterado);

        res.status(200).json({ mensagem: "Aluno excluído com sucesso." });
    });

function lerBancoDados() {
    const arquivo = fs.readFileSync('./db/db.json');
    const db = JSON.parse(arquivo);
    return db;
}

function gravarBancoDados(db) {
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
}







module.exports = usuarios;