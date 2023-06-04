const mongoose = require('mongoose');

const cadastroSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    sobrenome: String,
    dataNascimento: String,
    telefone: Number,
    endereco: String,
    cidade: String,
    estado: String,
    status: Boolean,
    imagemPerfil: {
        data: Buffer, 
        contentType: String 
    }
});

module.exports = mongoose.model('cadastro', cadastroSchema);