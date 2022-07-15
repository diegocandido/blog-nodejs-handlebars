const mongoose = require('mongoose')

const PostagemSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    descricao: {
        type: String,
    },
    conteudo: {
        type: String,
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    imagem: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const postagens = mongoose.model('postagens', PostagemSchema);

module.exports = { postagens };