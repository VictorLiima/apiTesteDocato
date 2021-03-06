var express = require("express");
var User = require("../models/user");
var router = express.Router();
const jwt = require("jsonwebtoken");

class Usuario {
  //construtor da função
  constructor() {}

  //função de registro de usuario
  async registroUsuario(req, res, next) {
    var novoUsuario = new User({
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
      nomeDeUsuario: req.body.nomeDeUsuario,
      senha: req.body.senha,
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
  }

  //função de atualização de usuario
  async atualizaUsuario(req, res, next) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { upsert: true },
      function (err, doc) {
        if (err) {
          res.status(500).json({ error: "Erro ao atualizar usuário" });
          res.end();
          return;
        }
        res.json(req.body);
        res.end();
      }
    );
  }

  //função de consulta de um usuario
  async retornaUsuario(req, res, next) {
    const usuario = await User.findOne({ _id: req.params.id });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
    return res.json(usuario);
  }

  //função de consulta de usuarios
  async retornaUsuarios(req, res, next) {
    const { searchText, page } = req.query;
    const skip = page ? Number(page) * 10 : 0;
    const usuarios = await User.aggregate([
      {
        $match: {
          $or: [
            {
              email: new RegExp(searchText || "", "i"),
            },
            {
              nome: new RegExp(searchText || "", "i"),
            },
          ],
        },
      },
      {
        $sort: {
          nome: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: 10,
      },
    ]);
    const total = await User.aggregate([
      {
        $match: {
          $or: [
            {
              email: new RegExp(searchText || "", "i"),
            },
            {
              nome: new RegExp(searchText || "", "i"),
            },
          ],
        },
      },
      {
        $count: "total",
      },
    ]);
    if (!usuarios) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
    return res.json({ usuarios, total: total[0].total });
  }

  //função de exclusão de usuario
  async deletaUsuario(req, res, next) {
    User.findOneAndDelete({ _id: req.params.id }).remove(function (err) {
      if (err) {
        res.status(500).json({ error: "Erro ao deletar usuário" });
        res.end();
        return;
      }
      res.json("Usuário deletado com sucesso");
      res.end();
    });
  }
}

module.exports = Usuario;
