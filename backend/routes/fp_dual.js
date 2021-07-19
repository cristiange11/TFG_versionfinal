const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Fp = require('../models/fp_dual');

const fpController = require('../controllers/fp_dual');

router.get('/:codigoCentro', fpController.getFpByCentro);

router.delete('/delete/:id', fpController.DeleteUsuariosByFP);

router.get('/', fpController.getFps);

router.get('/:id', fpController.getFp);

router.delete('/:id', fpController.deleteFp);

router.post(
  '/create',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('totalPlazas').trim().not().isEmpty().withMessage("Total de plazas vacías"),
    body('anio').trim().not().isEmpty().withMessage("Año vacío"),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío"),
    body('plazasDisponibles').trim().not().isEmpty().withMessage("Plazas disponibles vacías")
      .custom(async (plazasDisponibles , {req}) => {
        if (plazasDisponibles > req.body.totalPlazas) {
          return Promise.reject('Plazas disponibles mayor que total de plazas');
        }
    })
  ],
  fpController.createFp
);

router.put(
  '/update',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('totalPlazas').trim().not().isEmpty().withMessage("Total de plazas vacías"),
    body('anio').trim().not().isEmpty().withMessage("Año vacío"),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío"),
    body('plazasDisponibles').trim().not().isEmpty().withMessage("Plazas disponibles vacías")
      .custom(async (plazasDisponibles , {req}) => {
        if (plazasDisponibles > req.body.totalPlazas) {
          return Promise.reject('Plazas disponibles mayor que total de plazas');
        }
    })

  ],
  fpController.updateFp
);


module.exports = router;

