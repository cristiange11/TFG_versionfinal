const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const ResultadoAprendizaje = require('../models/resultadoAprendizaje');

const resultadoAprendizajeController = require('../controllers/resultadoAprendizaje');

router.get('/:codigoModulo', resultadoAprendizajeController.getResultadoAprendizajes);

router.delete('/:id', resultadoAprendizajeController.deleteResultadoAprendizaje);

router.post(
  '/create',
  [
    
    body('codigoModulo').trim().not().isEmpty().withMessage("Código Módulo vacío"),
    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  resultadoAprendizajeController.createResultadoAprendizaje
);

router.put(
  '/update',
  [
    body('codigoModulo').trim().not().isEmpty().withMessage("Código Módulo vacío"),
    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  resultadoAprendizajeController.updateResultadoAprendizaje
);

module.exports = router;