const mongoose = require('mongoose')

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const categorias = mongoose.model('categorias', CategoriaSchema)

module.exports = { categorias };