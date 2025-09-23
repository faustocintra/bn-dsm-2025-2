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
    await prisma.cliente.create({ data: req.body })

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
    const result = await prisma.cliente.findMany({
      orderBy: [ { nome: 'asc' }]  // Ordem ASCendente
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

controller.retrieveOne = async function(req, res) {
  try {
    // Manda recuperar o documento no servidor de BD
    // usando como critério um id informado no parâmetro
    // da requisição
    const result = await prisma.cliente.findUnique({
      where: { id: req.params.id }
    })

    // Encontrou o docuemento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com código de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    // Busca o documento passado como parâmetro e, caso o documento seja
    // encontrado, atualiza-o com as informações contidas em req.body
    await prisma.cliente.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // P2025: erro do Prisma referente a objeto não encontrado
    if(error?.code === 'P2025') {
      // Não encontrou e não atualizou ~> retorna HTTP 404: Not Found
      res.status(404).end()
    }
    else {    // Outros tipos de erro
      // Envia o erro ao front-end, com código de erro
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
    }
  }
}

controller.delete = async function(req, res) {
  try {
    // Busca o documento pelo id passado como parâmetro
    // e efetua a exclusão, caso o documento seja encontrado
    await prisma.cliente.delete({
      where: { id: req.params.id }
    })

    // Encontrou e excluiu ~> retorna HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // P2025: erro do Prisma referente a objeto não encontrado
    if(error?.code === 'P2025') {
      // Não encontrou e não excluiu ~> retorna HTTP 404: Not Found
      res.status(404).end()
    }
    else {    // Outros tipos de erro
      // Envia o erro ao front-end, com código de erro
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
    }
  }
}

export default controller