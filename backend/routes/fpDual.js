const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Fp = require('../models/fpDual');
const Centro = require('../models/centro');
const fpController = require('../controllers/fpDual');

router.get('/:codigoCentro', fpController.getFpByCentro);

router.delete('/delete/:id', fpController.DeleteUsuariosByFP);

router.get('/', fpController.getFps);

router.get('/:id', fpController.getFp);

router.get('/adminCentro/:codigoCentro', fpController.getFpsByAdminCentro);

router.get('/alumno/:codigoCentro', fpController.getFpsConPlazasDisponibles);

router.delete('/:id', fpController.deleteFp);

router.post(
  '/create',
  [
    body('nombre').trim().not().isEmpty().withMessage("Nombre vacío"),
    body('descripcion').trim().not().isEmpty().withMessage("Dirección vacía"),
    body('totalPlazas').trim().not().isEmpty().withMessage("Total de plazas vacías")
    .custom(async (totalPlazas) => { 
      
      if (isNaN(totalPlazas))  {
        return Promise.reject('Error total Plazas');
      }
      else if(totalPlazas <= 0){
        
        return Promise.reject('Mínimo 1 plaza');

      }
    
  }),
    body('anio').trim().not().isEmpty().withMessage("Año vacío")
    .custom(async (anio) => {
      let fecha = new Date();
      let anioActual = fecha.getFullYear();
     
      if(anio<anioActual){
       return Promise.reject('Año pasado')
      }
    }),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío")
    .custom(async (codigoCentro) => {
      const user = await Centro.find(codigoCentro);
      if (user[0].length == 0) {
        return Promise.reject('Centro no existente');
      }
    }),
    body('plazasDisponibles').trim().not().isEmpty().withMessage("Plazas disponibles vacías")
      .custom(async (plazasDisponibles , {req}) => {
        if (isNaN(plazasDisponibles))  {
          return Promise.reject('Error total Plazas');
        }
        else if(plazasDisponibles <= 0){         
          return Promise.reject('Mínimo 1 plaza');  
        }else if(plazasDisponibles > req.body.totalPlazas){ 
          return Promise.reject('Plazas disponibles < total plazas');  
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
    body('totalPlazas').trim().not().isEmpty().withMessage("Total de plazas vacías")
    .custom(async (totalPlazas) => {    
      if (isNaN(totalPlazas))  {
        return Promise.reject('Error total Plazas');
      }
      else if(totalPlazas <= 0){
        
        return Promise.reject('Mínimo 1 plaza');

      }
    
  }),
    body('anio').trim().not().isEmpty().withMessage("Año vacío")
    .custom(async (anio) => {
      let fecha = new Date();
      let anioActual = fecha.getFullYear();
     
      if(anio<anioActual){
       return Promise.reject('Año pasado')
      }
    }),
    body('codigoCentro').trim().not().isEmpty().withMessage("Código centro vacío").custom(async (codigoCentro) => {
      const user = await Centro.find(codigoCentro);
      if (user[0].length == 0) {
        return Promise.reject('Centro no existente');
      }
    }),
    body('plazasDisponibles').trim().not().isEmpty().withMessage("Plazas disponibles vacías")
      .custom(async (plazasDisponibles , {req}) => {
        if (isNaN(plazasDisponibles))  {
          return Promise.reject('Error total Plazas');
        }
        else if(plazasDisponibles <= 0){         
          return Promise.reject('Mínimo 1 plaza');  
        }else if(plazasDisponibles > req.body.totalPlazas){ 
          console.log(plazasDisponibles + " ahora totalPalzas " + req.body.totalPlazas)
          return Promise.reject('Plazas disponibles < total plazas');  
        }
    })

  ],
  fpController.updateFp
);


module.exports = router;

