const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Alumno = require('../models/alumno');
const Fpdual = require('../models/fpdual');
const User = require('../models/user');
const Centro = require('../models/centro');
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
          return Promise.reject('DNI ya existe');
        }
      }),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('genero').trim().not().isEmpty().withMessage("Género vacío"),
    body('cp').trim().not().isEmpty()
      .matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
    body('apellidos').trim().not().isEmpty().withMessage("Apellidos vacío"),
    body('rol').trim().not().isEmpty().withMessage("Rol vacío")
    .isNumeric(body('rol')).withMessage("No es numérico"),
    body('fechaNacimiento').trim().not().isEmpty().withMessage("Fecha de nacimiento vacía")
      .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).withMessage("Formato fecha incorrecto: yyyy-mm-dd"),
    body('fpDual').trim().not().isEmpty().withMessage("FP vacío")
    .isNumeric(body('fpDual')).withMessage("No es numérico")
      .custom(async (fpDual) => {
        const user = await Fpdual.find(fpDual);
        if (user[0].length == 0) {
          return Promise.reject('FP Dual no existente');
        }
      }),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código del centro vacío")
      .custom(async (codigoCentro) => {
        const user = await Centro.find(codigoCentro);
        if (user[0].length == 0) {
          return Promise.reject('Centro no existente');
        }
      }),
    body('movil').trim().not().isEmpty().withMessage("Móvil vacío")
      .matches(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/).withMessage("Formato del móvil incorrecto")
      .custom(async (movil, { req }) => {
        const user = await User.findMovil(movil, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Movil introducido ya existe');
        }
      }),
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo, { req }) => {
        const user = await User.findCorreo(correo, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe');
        }
      })
      .normalizeEmail(),
    body('numeroExpediente').trim().not().isEmpty().withMessage("Numero expediente vacío")
      .custom(async (expediente , {req}) => {
        const user = await Alumno.findExpediente(expediente, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Número de expediente ya existe');
        }
      }),
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
  ],

  alumnoController.createAlumno
);

router.put(
  '/update',
  [
    body('dni').trim().not().isEmpty().withMessage("Dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto"),

    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('genero').trim().not().isEmpty().withMessage("Género vacío"),
    body('cp').trim().not().isEmpty()
      .matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
    body('apellidos').trim().not().isEmpty().withMessage("Apellidos vacío"),
    body('rol').trim().not().isEmpty().withMessage("Rol vacío"),
    body('fechaNacimiento').trim().not().isEmpty().withMessage("Fecha de nacimiento vacía")
      .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).withMessage("Formato fecha incorrecto: yyyy-mm-dd"),
    body('fpDual').trim().not().isEmpty().withMessage("FP vacío")
      .custom(async (fpDual) => {
        const user = await Fpdual.find(fpDual);
        if (user[0].length == 0) {
          return Promise.reject('FP Dual no existente');
        }
      }),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código del centro vacío")
      .custom(async (codigoCentro) => {
        const user = await Centro.find(codigoCentro);
        if (user[0].length == 0) {
          return Promise.reject('Centro no existente');
        }
      }),
    body('movil').trim().not().isEmpty().withMessage("Móvil vacío")
      .matches(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/).withMessage("Formato del móvil incorrecto")
      .custom(async (movil, { req }) => {
        const user = await User.findMovil(movil, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Movil introducido ya existe');
        }
      }),
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo, { req }) => {
        const user = await User.findCorreo(correo, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe');
        }
      })
      .normalizeEmail(),
    body('numeroExpediente').trim().not().isEmpty().withMessage("Numero expediente vacío")
      .custom(async (expediente, {req}) => {
        const user = await Alumno.findExpediente(expediente, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Número de expediente ya existe');
        }
      }),
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
  ],
  alumnoController.updateAlumno
);

module.exports = router;
