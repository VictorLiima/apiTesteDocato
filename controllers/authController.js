const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const Token = require('../config/Token');

class Auth{
    //construtor da função
    constructor(){};

    //login de usuário
    async login(req, res) {
        try {
        const { email, senha  } = req.body
        const usuarioLogin = {}
        usuarioLogin.email = email
        usuarioLogin.senha = senha 
        const usuario = await Usuario.findOne({ email }).select('+senha')
        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado!" })
        }
        if (senha !== usuario.senha) {
            return res.status(401).json({ error: "Senha Inválida" })
        }
        return res.json({
            token: await Token.generateToken({ id: usuario._id })
        });
        } catch (err) {
        return res.status(500).json({ error: "Falha na autenticação" })
        }
    };
};

module.exports = Auth;
