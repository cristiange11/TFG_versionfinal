const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Modulo = require('../models/modulo');

const moduloController = require('../controllers/modulo');

router.get('/:fpDual', moduloController.getModulos);

router.delete('/:codigo', moduloController.deleteModulo);

router.post(
  '/create',
  [
    
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('curso').trim().not().isEmpty().withMessage("Curso vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  moduloController.createModulo
);

router.put(
  '/update',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('curso').trim().not().isEmpty().withMessage("Curso vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  moduloController.updateModulo
);

module.exports = router;
