import { Router } from 'express'
import controller from '../controllers/fornecedores.js'

const router = Router()

router.post('/', controller.create)

router.get('/', controller.retrieveAll)

// :id é um PARÂMETRO DE ROTA, isto é, uma informação não fixa
// que será enviado ao back-end na própria rota
router.get('/:id', controller.retrieveOne)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

export default router