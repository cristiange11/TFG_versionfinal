const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const ResultadoAprendizaje = require('../models/resultadoAprendizaje');
const Modulo = require('../models/modulo');
const resultadoAprendizajeController = require('../controllers/resultadoAprendizaje');
//Definir rutas y comprobar que los campos son correctos
router.get('/:codigoModulo', resultadoAprendizajeController.getResultadoAprendizajes);

router.delete('/:id', resultadoAprendizajeController.deleteResultadoAprendizaje);

router.post(
  '/create',
  [

    body('codigoModulo').trim().not().isEmpty().withMessage("Código Módulo vacío")
      .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Módulo no existente');
        }
      }),
    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  resultadoAprendizajeController.createResultadoAprendizaje
);

router.put(
  '/update',
  [
    body('codigoModulo').trim().not().isEmpty().withMessage("Código Módulo vacío")
      .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Módulo no existente');
        }
      }),
    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  resultadoAprendizajeController.updateResultadoAprendizaje
);

module.exports = router;