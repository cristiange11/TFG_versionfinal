const express = require('express');
const { body } = require('express-validator');
const router = express.Router();


const User = require('../models/user');
const Rol = require('../models/roles');
const authController = require('../controllers/auth');

router.post(
  '/signup',
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
    body('rol').trim().not().isEmpty().withMessage("Rol vacío")
    .custom(async (rol) => {
     
      if(!isNaN(rol)){
        const user = await Rol.getRol(rol);
      if (user[0].length == 0) {
        return Promise.reject('Error');
      }
      }else{
        return Promise.reject('Campo erróneo');
      }
      
    }),
    body('fechaNacimiento').trim().not().isEmpty().withMessage("Fecha de nacimiento vacía")  
      .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).withMessage("Formato fecha incorrecto: yyyy/mm/dd"),
   
    body('movil').trim().not().isEmpty().withMessage("Móvil vacío")
      .matches(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/).withMessage("Formato del móvil incorrecto")
      .custom(async (movil,  {req} ) => {
        const user = await User.findMovil(movil,req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Movil introducido ya existe!');
        }
      }),
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo, {req}) => {
        const user = await User.findCorreo(correo, req.body.dni);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
  ],
  authController.signup
);

router.post('/login',[
  body('dni').trim().not().isEmpty().withMessage("Dni vacío")
      .matches(/^\d{8}[a-zA-Z]$/).withMessage("Formato DNI incorrecto")
    
], authController.login);

router.get('/', authController.getUsuarios);

router.get('/:codigoCentro', authController.getUsersByCentro);

router.delete('/:dni',authController.deleteUser);

router.delete('/usuario/:dni',authController.deleteLogsByUser);



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
    body('fechaNacimiento').trim().not().isEmpty().withMessage("Fecha de nacimiento vacía")
      .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).withMessage("Formato fecha incorrecto: yyyy-mm-dd"),
      body('actualPassword')
      .custom(async (actualPassword , {req}) => {
        if(actualPassword != null){
          await User.find(req.body.dni).then(async function (usuario){
              
              await User.comparePassword(actualPassword, usuario[0][0].password).then(function (resultado){
                if(!resultado){
                  
                  return Promise.reject('Contraseña incorrecta');
                }
              })
          })
  
        }
      }),
    body('movil').trim().not().isEmpty().withMessage("Móvil vacío")
      .matches(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/).withMessage("Formato del móvil incorrecto")
      .custom(async (movil, {req}) => {
       
          const user = await User.findMovil(movil, req.body.dni);
          if (user[0].length > 0) {
            return Promise.reject('Móvil introducido ya existe!');
          }
      }),
      
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo, {req}) => {
        
          const user = await User.findCorreo(correo, req.body.dni);
         
          if (user[0].length > 0) {
            return Promise.reject('Correo introducido ya existe!');
          }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
  ],
  authController.updateUsuario
);
router.post(
  '/recovery',
  [
    body('correo')
      .isEmail().withMessage("Formato correo incorrecto")
      .custom(async (correo) => {
        await User.getUser(correo).then(function (res){
          var cadena = JSON.stringify(res[0]);
          var cadenaJSON = JSON.parse(cadena)
          if(cadenaJSON.length == 0 ){
            return Promise.reject('Correo introducido no existe');
          }
        })
        
      })
      .normalizeEmail(),
    
  ],
  authController.RecoveryPassword
);
router.put(
  '/updatePassword',
  [
    
    body('password').trim().isLength({ min: 6 }).withMessage("Contraseña con una longitud menor a 6"),
  ],
  authController.updatePassword
);
module.exports = router;
