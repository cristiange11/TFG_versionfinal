const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Encuesta = require('../models/encuesta');
const User = require('../models/user');
const Modulo = require('../models/modulo');
const Resultado = require('../models/resultadoEncuesta');
const encuestaController = require('../controllers/encuesta');

router.get('/:codigoModulo', encuestaController.getEncuestas);

router.get('/encuesta/:id', encuestaController.getEncuesta);

router.get('/tutor/:dni/:codigoModulo', encuestaController.getEncuestasByTutor);

router.delete('/:id', encuestaController.deleteEncuesta);

router.post(
  '/create',
  [

    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('codigoModulo').trim().not().isEmpty().withMessage("Módulo vacío")
      .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Módulo no existente');
        }
      }),
    body('dniAlumno').trim().not().isEmpty().withMessage("DNI del alumno vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI alumno incorrecto")
      .custom(async (dni) => {
        const user = await User.find(dni);
        if (user[0].length == 0) {
          return Promise.reject('Alumno no existente en la aplicación');
        }
      }),
    body('dniTutorEmpresa').trim().not().isEmpty().withMessage("DNI del tutor vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI tutor incorrecto")
      .custom(async (dni) => {
        const user = await User.find(dni);
        if (user[0].length == 0) {
          return Promise.reject('Tutor no existente en la aplicación');
        }
      }),
    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía"),
    body('resultado').trim().not().isEmpty().withMessage("Resultado vacío")
      .custom(async (resultado) => {
        if (!isNaN(resultado)) {
          const user = await Resultado.getResultado(resultado);
          if (user[0].length == 0) {
            return Promise.reject('Error');
          }
        } else {
          return Promise.reject('Campo erróneo');
        }

      }),
  ],
  encuestaController.createEncuesta
);

router.put(
  '/update',
  [
    body('titulo').trim().not().isEmpty().withMessage("Título vacío"),
    body('codigoModulo').trim().not().isEmpty().withMessage("Módulo vacío")
      .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Módulo no existente');
        }
      }),

    body('descripcion').trim().not().isEmpty().withMessage("Descripción vacía"),
    body('resultado').trim().not().isEmpty().withMessage("Resultado vacío")
      .custom(async (resultado) => {
        if (!isNaN(resultado)) {
          const user = await Resultado.getResultado(resultado);
          if (user[0].length == 0) {
            return Promise.reject('Error');
          }
        } else {
          return Promise.reject('Campo erróneo');
        }

      }),
  ],
  encuestaController.updateEncuesta
);

module.exports = router;