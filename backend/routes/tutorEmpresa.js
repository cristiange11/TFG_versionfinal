const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const TutorEmpresa = require('../models/tutorEmpresa');

const tutorController = require('../controllers/tutorEmpresa');

router.get('/', tutorController.getTutores);

router.get('/:dni', tutorController.getTutor);

router.delete('/:dni', tutorController.deleteTutor);

router.post(
    '/create',
    [
      body('dni').trim().not().isEmpty().withMessage("dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const tutor = await TutorEmpresa.find(dni);
        if (tutor[0].length > 0) {
          return Promise.reject('DNI introducido ya existe!');
        }
      }),
      body('cif_empresa').trim().not().isEmpty().withMessage("CIF vacío"),
      body('modulo_empresa').trim().not().isEmpty().withMessage("CIF vacío")
      
    ],
      tutorController.createTutor
  );

router.put(
    '/update',
    [
      body('modulo_empresa').trim().not().isEmpty().withMessage("Módulo de la empresa vacío"),    
    ],
      tutorController.updateTutor
  );
  
module.exports = router;
