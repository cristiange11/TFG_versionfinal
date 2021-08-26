const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Modulo = require('../models/modulo');
const FP = require('../models/fpDual');
const moduloController = require('../controllers/modulo');

router.get('/:fpDual', moduloController.getModulos);

router.get('/profesor/:dni', moduloController.getModulosProf);

router.get('/alumno/:dni', moduloController.getModulosAlum);

router.get('/alumno/modulo/:dni/:fpDual', moduloController.getModulosAlumUpdate);

router.get('/tutor/:dni', moduloController.getModulosTut);

router.delete('/:codigo', moduloController.deleteModulo);

router.delete('/modulo/:codigo', moduloController.deleteAllByModulo);

router.post(
  '/create',
  [
    body('fpDual').trim().not().isEmpty().withMessage("FP Dual vacío")
      .custom(async (fpDual) => {
        if (!isNaN(fpDual)) {
          const user = await FP.getFp(fpDual);
          if (user[0].length == 0) {
            return Promise.reject('Error');
          }
        } else {
          return Promise.reject('Campo erróneo');
        }
      }),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('curso').trim().not().isEmpty().withMessage("Curso vacío")
      .custom(async (curso) => {
        if (curso != "1" && curso != "2") {
          return Promise.reject('Introduce un curso válido');
        }
      }),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  moduloController.createModulo
);

router.put(
  '/update',
  [
    body('fpDual').trim().not().isEmpty().withMessage("FP Dual vacío")
      .custom(async (fpDual) => {
        if (!isNaN(fpDual)) {
          const user = await FP.getFp(fpDual);
          if (user[0].length == 0) {
            return Promise.reject('Error');
          }
        } else {
          return Promise.reject('Campo erróneo');
        }
      }),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('curso').trim().not().isEmpty().withMessage("Curso vacío").custom(async (curso) => {
      if (curso != "1" && curso != "2") {
        return Promise.reject('Introduce un curso válido');
      }
    }),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía")
  ],
  moduloController.updateModulo
);

module.exports = router;
