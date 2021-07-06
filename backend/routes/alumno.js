const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Alumno = require('../models/alumno');

const alumnoController = require('../controllers/alumno');

router.get('/', alumnoController.getAlumnos);

router.get('/:dni', alumnoController.getAlumno);

router.delete('/:dni', alumnoController.deleteAlumno);

router.post(
    '/create',
    [
      body('dni').trim().not().isEmpty().withMessage("dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const alumno = await Alumno.find(dni);
        if (alumno[0].length > 0) {
          return Promise.reject('DNI introducido ya existe!');
        }
      }),
      body('numero_expediente').trim().not().isEmpty().withMessage("Número expediente vacío")
      .custom(async (numero_expediente) => {
        const alumno = await Alumno.findExpediente(numero_expediente);
        if (alumno[0].length > 0) {
          return Promise.reject('Numero del expediente introducido ya existe!');
        }
      }),
      
    ],
      alumnoController.createAlumno
  );
/*
router.put(
    '/update',
    [
      body('numero_expediente').trim().not().isEmpty().withMessage("Numero expediente vacío"), 
    ],
      alumnoController.updateAlumno
  );
  */
module.exports = router;
