const yup = require('yup')

const schema = yup.object.shape(
    {
        nome: yup.string()
            .min(3, "o nome precisa de pelo menos 3 caracteres")
            .max(50, "o nome pode no máximo 50 caracteres")
            .required("o nome é obrigatório"),
        descricao: yup.string()
            .min(10, "A descrição precisa de pelo menos 10 carcteres")
            .max(500, "A descrição pode no máximo 500 caracteres")
            .required("A descrição é obrigatória"),
        data_inicio: yup.date().required("A data de início é obrigatória"),
        data_fim: yup.date().required("A data final é obrigatória")
    }
)

async function validarProjeto(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarProjeto }