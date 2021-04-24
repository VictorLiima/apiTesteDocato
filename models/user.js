const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
    cpf: {
      type: String,
      required: true,
    },
    nomeDeUsuario: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usuarios", UsuarioSchema);
