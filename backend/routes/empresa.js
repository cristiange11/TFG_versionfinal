const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Empresa = require('../models/empresa');

const empresaController = require('../controllers/empresa');
//Definir rutas y comprobar que los campos son correctos
router.get('/', empresaController.getEmpresas);

router.get('/:codigoCentro', empresaController.getEmpresasByCentro);

router.get('/fp/:fpDual', empresaController.getEmpresasByFp);

router.get('/empresa/:idEmpresa', empresaController.getFpAndCentroByEmpresa);

router.delete('/delete/:id', empresaController.deleteTutorEmpresaByEmpresa);

router.delete('/:id', empresaController.deleteEmpresa);

router.post(
  '/create',
  [
    body('cifEmpresa').trim().not().isEmpty().withMessage("CIF vacío")
      .matches(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/).withMessage("Formato CIF incorrecto"),

    body('direccion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('telefono').trim().not().isEmpty().withMessage("Teléfono vacío")
      .matches(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/).withMessage("Formato teléfono incorrecto")
      .custom(async (telefono, { req }) => {
        const user = await Empresa.findTelefono(telefono, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Teléfono introducido ya existe');
        }
      }), body('correo')
        .isEmail().withMessage("Formato email incorrecto")
        .custom(async (correo, { req }) => {
          const user = await Empresa.findCorreo(correo, req.body.cifEmpresa);
          if (user[0].length > 0) {
            return Promise.reject('Correo ya existe');
          }

        })
        .normalizeEmail(),
    body('url').trim().not().isEmpty().withMessage("URL vacía")
      .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/).withMessage("Formato CIF incorrecto"),
    body('becas').trim().not().isEmpty().withMessage("Becas vacía")
      .custom(async (becas) => {
        if (isNaN(becas) || (becas != 1 && becas != 0)) {
          return Promise.reject('Campo erróneo');
        }

      }),
    body('plazas').trim().not().isEmpty().withMessage("Plazas vacía")
      .custom(async (plazas) => {
        if (isNaN(plazas) || plazas <= 0) {
          return Promise.reject('Mínimo 1 plaza');
        }

      }),
    body('dineroBeca').trim().not().isEmpty().withMessage("Dinero de beca vacío")
      .custom(async (dineroBeca, { req }) => {

        if (isNaN(dineroBeca) || req.body.becas == 1 && dineroBeca < 100) {
          return Promise.reject('La beca mínima tiene que ser 100 euros');
        }

      }),

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
      .custom(async (telefono, { req }) => {
        const user = await Empresa.findTelefono(telefono, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Teléfono introducido ya existe');
        }
      }),
    body('correo')
      .isEmail().withMessage("Formato email incorrecto")
      .custom(async (correo, { req }) => {
        const user = await Empresa.findCorreo(correo, req.body.cifEmpresa);
        if (user[0].length > 0) {
          return Promise.reject('Correo ya existe');
        }

      })
      .normalizeEmail(),
    body('url').trim().not().isEmpty().withMessage("URL vacía")
      .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/).withMessage("Formato URL incorrecto"),
    body('becas').trim().not().isEmpty().withMessage("Becas vacía")
      .custom(async (becas) => {
        if (isNaN(becas) || (becas != 1 && becas != 0)) {
          return Promise.reject('Campo erróneo');
        }

      }),
    body('plazas').trim().not().isEmpty().withMessage("Plazas vacía")
      .custom(async (plazas) => {
        if (isNaN(plazas) || plazas <= 0) {
          return Promise.reject('Mínimo 1 plaza');
        }

      }),
    body('dineroBeca').trim().not().isEmpty().withMessage("Dinero de beca vacío")
      .custom(async (dineroBeca, { req }) => {

        if (isNaN(dineroBeca) || req.body.becas == 1 && dineroBeca < 100) {
          return Promise.reject('La beca mínima tiene que ser 100 euros');
        }

      }),

  ],
  empresaController.updateEmpresa
);

module.exports = router;
