const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Profesor = require('../models/profesor');

const profesorController = require('../controllers/profesor');

router.get('/', profesorController.getProfesores);

router.get('/:dni', profesorController.getProfesor);

router.delete('/:dni', profesorController.deleteProfesor);

router.post(
    '/create',
    [
      body('dni').trim().not().isEmpty().withMessage("dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const profesor = await Profesor.find(dni);
        if (profesor[0].length > 0) {
          return Promise.reject('DNI introducido ya existe!');
        }
      }),
      body('departamento').trim().not().isEmpty().withMessage("Departamento vacío"),
      
    ],
      profesorController.createProfesor
  );

router.put(
    '/update',
    [
      body('departamento').trim().not().isEmpty().withMessage("Departamento vacío"), 
    ],
      profesorController.updateProfesor
  );
  
module.exports = router;