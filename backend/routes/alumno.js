const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Alumno = require('../models/alumno');

const User = require('../models/user');
const alumnoController = require('../controllers/alumno');

router.get('/', alumnoController.getAlumnos);

router.get('/:dni', alumnoController.getAlumno);

router.delete('/:dni', alumnoController.deleteAlumno);

router.post(
    '/create',
    [
      body('dni').trim().not().isEmpty().withMessage("Dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
      .custom(async (dni) => {
        const user = await User.find(dni);
        if (user[0].length > 0) {
          return Promise.reject('DNI ya existe!');
        }
      }),
      body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('genero').trim().not().isEmpty().withMessage("Género vacío"),
    body('cp').trim().not().isEmpty()
      .matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
    body('apellidos').trim().not().isEmpty().withMessage("Apellidos vacío"),
    body('rol').trim().not().isEmpty().withMessage("Rol vacío"),
    body('fecha_nacimiento').trim().not().isEmpty().withMessage("Fecha de nacimiento vacía")
    .matches(/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/).withMessage("Formato fecha incorrecto: dd/mm/yyyy"),
    body('fp_dual').trim().not().isEmpty().withMessage("FP vacío"),
    body('codigo_centro').trim().not().isEmpty().withMessage("Código del centro vacío"),
    body('movil').trim().not().isEmpty().withMessage("Móvil vacío")
      .matches(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/).withMessage("Formato del móvil incorrecto")
      .custom(async (movil) => {
        const user = await User.findMovil(movil);
        if (user[0].length > 0) {
          return Promise.reject('Movil introducido ya existe!');
        }
      }),
      body('numero_expediente').trim().not().isEmpty().withMessage("Numero expediente vacío")
      .custom(async (expediente) => {
        const user = await Alumno.findExpediente(expediente);
        if (user[0].length > 0) {
          return Promise.reject('Número de expediente ya existe!');
        }
      }),
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo) => {
        const user = await User.findCorreo(correo);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
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
