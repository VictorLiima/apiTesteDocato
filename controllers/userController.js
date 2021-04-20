var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

class Usuario{
    //construtor da função
    constructor(){};

    //função de registro de usuario
    async registroUsuario(req, res, next){
        var db = require('../db');
        var UsuarioController = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
        var novoUsuario = new UsuarioController({
            nome: req.body.name, 
            email: req.body.email,
            cpf: req.body.cpf,
            nomeDeUsuario: req.body.nomeDeUsuario,
            senha: req.body.senha
        });
        novoUsuario.save(function (err) {
            if (err) {
                res.status(500).json({ error: "Erro ao cadastrar" });
                res.end();
                return;
            }
        res.json(novoUsuario);
        res.end();
        });
    };

    //função de atualização de usuario
    async atualizaUsuario(req, res, next){
        var db = require('../db');
        var UsuarioController = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
        UsuarioController.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar usuário' });
                res.end();
                return;
            }
            res.json(req.body);
            res.end();  
        });
    };

    //função de consulta de um usuario
    async retornaUsuario(req, res, next){
        var db = require('../db');
        var UsuarioController = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
        UsuarioController.find({ _id: req.params.id }).lean().exec(function (e, docs) {
            res.json(docs);
            res.end();
        });
    };

    //função de consulta de usuarios
    async retornaUsuarios(req, res, next){
        var db = require('../db');
        var UsuarioController = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
        UsuarioController.find({}).lean().exec(function(e,docs){
            res.json(docs);
            res.end();
        });
    };

    //função de exclusão de usuario
    async deletaUsuario(req, res, next){
        var db = require('../db');
        var UsuarioController = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
        UsuarioController.find({ _id: req.params.id }).remove(function (err) {
            if (err) {
                res.status(500).json({ error: 'Erro ao deletar usuário' });
                res.end();
                return;
            }
            res.json('Usuário deletado com sucesso');
            res.end();
        });
    }
};

module.exports = Usuario;