const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Modulo = require('../models/modulo');
const User = require('../models/user');
const calificacionController = require('../controllers/calificacion');

router.get('/:codigoModulo', calificacionController.getCalificaciones);

router.delete('/:id', calificacionController.deleteCalificacion);

router.post(
  '/create',
  [
    body('dni').trim().not().isEmpty().withMessage("Dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const user = await User.find(dni);
        if (user[0].length == 0) {
          return Promise.reject('DNI no existente');
        }
      }),
    body('descripcion').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('codigoModulo').trim().not().isEmpty().withMessage("Módulo vacío")
    .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Error en el módulo');
        }
      }),
      body('nota').trim().not().isEmpty().withMessage("Nota vacía")
    .custom(async (nota) => {    
      if (isNaN(nota))  {
        return Promise.reject('Tiene que ser numérico');
      }
      else if(nota<0 || nota>10){
        return Promise.reject('La nota tiene que esta entre 0 y 10');
      }
    
  }),
  ],
  calificacionController.createCalifcacion
);

router.put(
  '/update',
  [
    body('dni').trim().not().isEmpty().withMessage("Dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const user = await User.find(dni);
        if (user[0].length == 0) {
          return Promise.reject('DNI no existente');
        }
      }),
    body('descripcion').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('codigoModulo').trim().not().isEmpty().withMessage("Módulo vacío")
    .custom(async (codigoModulo) => {
        const user = await Modulo.find(codigoModulo);
        if (user[0].length == 0) {
          return Promise.reject('Error en el módulo');
        }
      }),
      body('nota').trim().not().isEmpty().withMessage("Nota vacía")
    .custom(async (nota) => {    
      if (isNaN(nota))  {
        return Promise.reject('Tiene que ser numérico');
      }
      else if(nota<0 || nota>10){
        return Promise.reject('La nota tiene que esta entre 0 y 10');
      }
    
  }),
  ],
  calificacionController.updateCalificacion
);


module.exports = router;