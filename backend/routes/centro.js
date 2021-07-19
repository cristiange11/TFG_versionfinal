const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Centro = require('../models/centro');

const centroController = require('../controllers/centros');

router.get('/', centroController.getCentros);

router.delete('/:codigoCentro', centroController.deleteCentro);

router.delete('/delete/:codigoCentro', centroController.deleteUserAndFPByCentro);


router.post(
  '/create',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('provincia').trim().not().isEmpty().withMessage("Provincia vacía"),
    body('CP').trim().not().isEmpty().withMessage("CP vacío")
      .matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/).withMessage("Formato CP vacío"),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío"),
    body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
      .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
      .custom(async (telefono , {req}) => {
        
          const user = await Centro.findTelefono(telefono, req.body.codigoCentro);
          if (user[0].length > 0) {
            return Promise.reject('Teléfono introducido ya existe!');
          }
        
      }),
    body('correo')
      .isEmail().withMessage("Formato email incorrecto")
      .custom(async (correo , {req}) => {
        const user = await Centro.findCorreo(correo, req.body.codigoCentro);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe!');
        }
      
    })
      .normalizeEmail()

  ],
  centroController.createCentro
);

router.put(
  '/update',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('provincia').trim().not().isEmpty().withMessage("Provincia vacía"),
    body('CP').trim().not().isEmpty().withMessage("CP vacío")
      .matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/).withMessage("Formato CP vacío"),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío"),
    body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
      .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
      .custom(async (telefono, {req}) => {
          const user = await Centro.findTelefono(telefono, req.body.codigoCentro);
          if (user[0].length > 0) {
            return Promise.reject('Teléfono introducido ya existe!');
          }
        
      }),
    body('correo')
      .isEmail().withMessage("Formato email incorrecto")
      .custom(async (correo , {req}) => {
          const user = await Centro.findCorreo(correo, req.body.codigoCentro);
          if (user[0].length > 0) {
            return Promise.reject('Correo ya existe!');
          }
        
      })
      .normalizeEmail()

  ],
  centroController.updateCentro
);


module.exports = router;
