var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//retorna todos os usuários
router.get('/usuarios', function (req, res, next) {
  var db = require('../db');
  var Usuario = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
  Usuario.find({}).lean().exec(function(e,docs){
     res.json(docs);
     res.end();
  });
});

//retorna um usuário
router.get('/usuarios/:id', function (req, res, next) {
    var db = require('../db');
    var Usuario = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
    Usuario.find({ _id: req.params.id }).lean().exec(function (e, docs) {
        res.json(docs);
        res.end();
    });
});

//cadastrar um usuário
router.post('/usuarios/cadastro', function (req, res, next) {
  var db = require('../db');
  var Usuario = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
  var novoUsuario = new Usuario({
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
});

//Atualização de usuários
router.put('/usuarios/:id', function (req, res, next) {
  var db = require('../db');
  var Usuario = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
  Usuario.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: 'Erro ao atualizar usuário' });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

//Delete de usuários
router.delete('/usuarios/:id', function (req, res, next) {
    var db = require('../db');
    var Usuario = db.Mongoose.model('usuarios', db.UsuarioSchema, 'usuarios');
    Usuario.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
            res.end();
            return;
        }
        res.json('Usuário deletado com sucesso');
        res.end();
    });
});

module.exports = router;
