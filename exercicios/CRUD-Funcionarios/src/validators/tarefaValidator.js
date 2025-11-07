const yup = require('yup')

const schema = yup.object().shape(
    {
        titulo: yup.string()
            .min(3, "O título precisa de pelo menos 3 caracteres")
            .max(100, "O título pode ter no máximo 100 caracteres")
            .required("O título é obrigatório"),
        descricao: yup.string()
            .min(10, "A descrição precisa de pelo menos 10 caracteres")
            .max(500, "A descrição pode ter no máximo 500 caracteres")
            .required("A descrição é obrigatória"),
        data_inicio: yup.date().required("A data de início é obrigatória"),
        data_fim: yup.date().required("A data final é obrigatória")
    }
)

async function validarTarefa(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erros: error.errors })
    }
}

module.exports = { validarTarefa }