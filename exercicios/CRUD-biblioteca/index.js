const express = require('express')
const app = express()

app.use(express.json())

const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!!!!")
  })
  .catch(erro => {
    console.log("Erro ao conectar no banco MongoDB: ", erro)
  })


const LivroModel = mongoose.model('livros', new mongoose.Schema(
  {
    nome: String,
    autor: String,
    dataCriacao: { type: Date, default: Date.now() }
  }
))

app.post('/livros', async(req,res,next) => {
  const livro = req.body
  if (!livro.nome || !livro.autor) {
    return res.status(400).json({ erro: "Campos nome e autor são obrigatórios!" })
  }
  const livroCriado = await LivroModel.create(livro)
  res.status(201).json(livroCriado)
})

app.get('/livros', async (req, res, next) => {
  const livros = await LivroModel.find()
  res.json(livros)
})

app.put('/livros/:id', async (req, res, next) => {
  const id = req.params.id
  const livro = req.body
  if (!livro.nome || !livro.autor) {
    return res.status(400).json({ erro: "Campos nome e autor são obrigatórios!" })
  }
  const livroAtualizado = await LivroModel.findByIdAndUpdate(id, livro, { new: true })
  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro não encontrado!" })
  }
  res.json(livroAtualizado)
})

app.delete('/livros/:id', async (req, res, next) => {
  const id = req.params.id
  await LivroModel.findByIdAndDelete(id)
  res.status(204).send()
})


app.listen(3000, ()=>{
    console.log("Aplicação rodando em http://localhost:3000")
})