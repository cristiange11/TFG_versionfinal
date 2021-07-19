const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Empresa = require('../models/empresa');

const empresaController = require('../controllers/empresa');

router.get('/', empresaController.getEmpresas);

router.delete('/delete/:CIF', empresaController.deleteTutorEmpresaByEmpresa);

router.post(
  '/create',
  [
    body('cifEmpresa').trim().not().isEmpty().withMessage("CIF vacío")
    .matches(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/).withMessage("Formato CIF incorrecto")
      .custom(async (cifEmpresa) => {
        const empresa = await Empresa.find(cifEmpresa);
        if (empresa[0].length > 0) {
          return Promise.reject('CIF introducido ya existe!');
        }
      }),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
      .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
      .custom(async (telefono,{req}) => {
        const user = await Empresa.findTelefono(telefono, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Teléfono introducido ya existe!');
        }
      }),body('correo')
      .isEmail().withMessage("Formato email incorrecto")
      .custom(async (correo , {req}) => {
        const user = await Empresa.findCorreo(correo, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe!');
        }
      
    })
      .normalizeEmail(),
    body('url').trim().not().isEmpty().withMessage("URL vacía")
    .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/).withMessage("Formato CIF incorrecto"),
  ],
  empresaController.createEmpresa
);

router.put(
  '/update',
  [
    body('cifEmpresa').trim().not().isEmpty().withMessage("CIF vacío")
    .matches(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/).withMessage("Formato CIF incorrecto"),
    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
      .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
      .custom(async (telefono , {req}) => {
        const user = await Empresa.findTelefono(telefono, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Teléfono introducido ya existe!');
        }
      }),
      body('correo')
      .isEmail().withMessage("Formato email incorrecto")
      .custom(async (correo , {req}) => {
        const user = await Empresa.findCorreo(correo, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe!');
        }
      
    })
      .normalizeEmail(),
    body('url').trim().not().isEmpty().withMessage("URL vacía")
    .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/).withMessage("Formato CIF incorrecto"),

  ],
  empresaController.updateEmpresa
);

module.exports = router;
