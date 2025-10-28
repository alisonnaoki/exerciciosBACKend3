const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        titulo: {type: String, required: true },
        autor: {type: String, required: true},
        editora: {type: String, required: true},
        ano: { type: Date, required: true},
        preco: { type: String, required: true}
    },
    {
        timestamps: true
    }
)

const LivroModel = mongoose.model('Livros', schema)

module.exports = LivroModel