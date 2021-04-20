var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const Usuario = require('../controllers/userController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//cadastrar um usuário
router.post('/usuarios/cadastro', function (req, res, next) {
    var usuario = new Usuario();
    usuario.registroUsuario(req, res, next);
});

//retorna todos os usuários
router.get('/usuarios', function (req, res, next) {
    var usuario = new Usuario();
    usuario.retornaUsuarios(req, res, next);
});

//retorna um usuário
router.get('/usuario/:id', function (req, res, next) {
    var usuario = new Usuario();
    usuario.retornaUsuario(req, res, next);
});


//Atualização de usuários
router.put('/usuarios/:id', function (req, res, next) {
    var usuario = new Usuario();
    usuario.atualizaUsuario(req, res, next);
});

//Delete de usuários
router.delete('/usuarios/:id', function (req, res, next) {
    var usuario = new Usuario();
    usuario.deletaUsuario(req, res, next);
});

//Login de usuários

module.exports = router;
