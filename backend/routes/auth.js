const express= require('express');
const { body } = require ('express-validator');
const router= express.Router();


const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('dni').trim().not().isEmpty()
    .matches('/^\d{8}[a-zA-Z]$/')
    .custom(async (dni) => {
      const user = await User.find(dni);
      if (user[0].length > 0) {
        return Promise.reject('DNI ya existe already exist!');
      }
    }),      
    body('nombre').trim().not().isEmpty(),
    body('direccion').trim().not().isEmpty(),
    body('genero').trim().not().isEmpty(),
    body('cp').trim().not().isEmpty()
    .matches('/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/'),
    body('apellidos').trim().not().isEmpty(),
    body('rol').trim().not().isEmpty(),
    body('fecha_nacimiento').trim().not().isEmpty()
    .matches("/^\d{1,2}\.\d{1,2}\.\d{4}$/"),
    body('codigo_centro').trim().not().isEmpty(),
    body('nombre_usuario').trim().not().isEmpty()
    .custom(async (nombre_usuario) => {
      const user = await User.findUsuario(nombre_usuario);
      if (user[0].length > 0) {
        return Promise.reject('Nombre de usuario ya existe!');
      }
    }),
    body('movil').trim().not().isEmpty()
    .matches('/^\6\d{8}$/')
    .custom(async (movil) => {
      const user = await User.findMovil(movil);
      if (user[0].length > 0) {
        return Promise.reject('Movil introducido ya existe!');
      }
    }),
    body('correo')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (correo) => {
        const user = await User.findCorreo(correo);
        if (user[0].length > 0) {
          return Promise.reject('Email ya existe!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

//router.post('/login', authController.login);

module.exports = router;
