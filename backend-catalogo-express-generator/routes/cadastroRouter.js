const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController');

router.get('/', cadastroController.listar)
router.get('/:id', cadastroController.listarPorId)
router.get('/', cadastroController.listarUsuarios)
router.post('/', cadastroController.salvar)
router.put('/:id', cadastroController.atualizar)
router.delete('/:id', cadastroController.excluir)

module.exports = router;
