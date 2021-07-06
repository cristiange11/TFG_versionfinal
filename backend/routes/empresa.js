const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Empresa = require('../models/empresa');

const empresaController = require('../controllers/empresa');

router.get('/', empresaController.getEmpresas);

router.get('/:CIF', empresaController.getEmpresa);

router.delete('/:CIF', empresaController.deleteEmpresa);

router.post(
    '/create',
    [
      body('CIF').trim().not().isEmpty().withMessage("CIF vacío")
      .custom(async (CIF) => {
        const empresa = await Empresa.find(CIF);
        if (empresa[0].length > 0) {
          return Promise.reject('CIF introducido ya existe!');
        }
      }),
      body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
      body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
      body('tipo').trim().not().isEmpty().withMessage("Tipo vacío"),
      body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
        .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
        .custom(async (telefono) => {
          const user = await Empresa.findTelefono(telefono);
          if (user[0].length > 0) {
            return Promise.reject('Teléfono introducido ya existe!');
          }
        }),
        body('url').trim().not().isEmpty().withMessage("URL vacía"),
      
    ],
      empresaController.createEmpresa
  );

router.put(
    '/update',
    [
      body('CIF').trim().not().isEmpty().withMessage("CIF vacío"),
      body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
      body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
      body('tipo').trim().not().isEmpty().withMessage("Tipo vacío"),
      body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
        .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
        .custom(async (telefono) => {
          const user = await Empresa.findTelefono(telefono);
          if (user[0].length > 0) {
            return Promise.reject('Teléfono introducido ya existe!');
          }
        }),
        body('url').trim().not().isEmpty().withMessage("URL vacía"),
      
    ],
      empresaController.updateEmpresa
  );
  
module.exports = router;
