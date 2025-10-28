const express = require('express')
const router = express.Router()
const LivroModel = require('../models/livroModel')


const { validarNovoLivro } = require('../validators/livroValidator')
const { validarID } = require('../validators/IDValidator')


router.post('/livros', validarNovoLivro, async (req, res, next) => {
  const dados = req.body
  const livroCadastrado = await LivroModel.create(dados)
  res.status(201).json(livroCadastrado)
})

router.get('/livros', async (req, res, next) => {
  const livros = await LivroModel.find()
  res.json(livros)
})

router.get('/livros/:id', async (req, res, next) => {
  const livroEncontrado = await LivroModel.findById(req.params.id)
  if (!livroEncontrado) {
    return res.status(404).json({ erro: "Livro não econtrado!" })
  }
  res.json(livroEncontrado)
})

// Atualização
router.put('/livros/:id', async (req, res, next) => {
  const id = req.params.id
  const novosDados = req.body
  const livroAtualizado = await LivroModel.findByIdAndUpdate(id, novosDados, { new: true })
  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro não encontrado!" })
  }
  res.json(livroAtualizado)
})

// Exclusão
router.delete('/livros/:id', async (req, res, next) => {
  const id = req.params.id
  await LivroModel.findByIdAndDelete(id)
  res.status(204).send()
})



module.exports = router