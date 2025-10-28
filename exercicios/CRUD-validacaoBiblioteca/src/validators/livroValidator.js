const yup = require('yup')
const schemaNovoLivro = yup.object().shape(
  {
    titulo: yup.string()
      .min(5, 'titulo inválido')
      .max(50, 'titulo inválido')
      .required('titulo é obrigatório'),
    autor: yup.string()
      .min(5, 'autor inválido')
      .max(50, 'autor inválido')
      .required('autor é obrigatório'),
    edicao: yup.string()
      .min(5, 'edicao inválido')
      .max(50, 'edicao inválido')
      .required('edicao é obrigatório'),
    ano: yup.date().required('ano é obrigatorio'),
    preco: yup.string()
      .matches(/^\d+(\.\d{1,2})?$/,'O preço deve ser um número válido com até duas casas decimais, usando ponto (.) como separador.')
  }
)

async function validarNovoLivro(req, res, next) {
  try {
    await schemaNovoLivro.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}


module.exports = {
  validarNovoLivro
}