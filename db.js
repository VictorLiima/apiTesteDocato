var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/docatoTest');
 
var usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    nomeDeUsuario: String,
    senha: String,
}, { collection: 'usuarios' }
);
 
module.exports = { Mongoose: mongoose, UsuarioSchema: usuarioSchema }