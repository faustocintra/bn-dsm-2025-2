import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  /*
    Conecta-se ao banco de dados e envia uma instrução
    de criação de um novo documento, contendo os dados
    que chegaram dentro da seção "body" da requisição
    ("req")
  */
  try {
    await prisma.categoria.create({ data: req.body })

    // Envia um código de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com código de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    // Manda buscar todas as categorias cadastradas no BD
    const result = await prisma.categoria.findMany({
      orderBy: [ { descricao: 'asc' }]  // Ordem ASCendente
    })

    // Retorna os dados obtidos ao cliente com o status
    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com código de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

export default controller