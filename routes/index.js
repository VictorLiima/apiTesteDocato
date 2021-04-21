var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const Usuario = require('../controllers/userController.js');
const Auth = require('../controllers/authController');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});


//cadastrar um usuário
router.post('/usuario/cadastro', async(req, res, next) =>{
    var usuario = new Usuario();
    await usuario.registroUsuario(req, res, next);
});

//retorna todos os usuários
router.get('/usuarios', async (req, res, next) =>{
    var usuario = new Usuario();
    await usuario.retornaUsuarios(req, res, next);
});

//retorna um usuário
router.get('/usuario/:id', async (req, res, next) =>{
    var usuario = new Usuario();
    await usuario.retornaUsuario(req, res, next);
});


//Atualização de usuários
router.put('/usuario/atualizacao/:id', async (req, res, next) =>{
    var usuario = new Usuario();
    await usuario.atualizaUsuario(req, res, next);
});

//Delete de usuário
router.delete('/usuario/delete/:id', async(req, res, next) =>{
    var usuario = new Usuario();
    await usuario.deletaUsuario(req, res, next);
});

//Login de usuários
router.post('/login', async(req, res, next) =>{
    var auth = new Auth();
    await auth.login(req, res, next);
});
module.exports = router;
