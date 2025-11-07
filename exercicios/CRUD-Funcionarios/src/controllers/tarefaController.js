const express = require('express')
const router = express.Router()

const TarefaModel = require('../models/tarefaModel')
const { validarTarefa } = require('../validators/tarefaValidator')

router.get('/tarefas', async (req, res, next) => {
    const tarefas = await TarefaModel.find().populate(['responsavel', 'projeto'])
    res.json(tarefas)
})

router.get('/tarefas/:id', async (req, res, next) => {
    const tarefaEncontrada = await TarefaModel.findById(req.params.id).populate(['responsavel', 'projeto'])
    
    if (!tarefaEncontrada) {
        return res.status(404).json({ erro: "Não encontrado" }) 
    }
    res.json(tarefaEncontrada)
})

router.post('/tarefas', validarTarefa, async (req, res, next) => {
    const tarefaCriada = await TarefaModel.create(req.body)
    await tarefaCriada.populate(['responsavel', 'projeto'])
    res.status(201).json(tarefaCriada)
})

router.put('/tarefas/:id', validarTarefa, async (req, res, next) => {
    const id = req.params.id
    const dados = req.body
    
    const tarefaAtualizada = await TarefaModel.findByIdAndUpdate(id, dados, { new: true })

    if (!tarefaAtualizada) {
        return res.status(404).json({ erro: "Não encontrado" })
    }
    
    await tarefaAtualizada.populate(['responsavel', 'projeto'])
    res.json(tarefaAtualizada)
})

router.delete('/tarefas/:id', async (req, res, next) => {
    const tarefaDeletada = await TarefaModel.findByIdAndDelete(req.params.id)

    if (!tarefaDeletada) {
        return res.status(404).json({ erro: "Não encontrado" })
    }
    
    res.status(204).send() 
})

module.exports = router