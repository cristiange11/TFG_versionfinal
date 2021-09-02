const express = require('express');

const router = express.Router();

const resultadoController = require('../controllers/resultadoEncuesta');
//Definir rutas y comprobar que los campos son correctos
router.get('/', resultadoController.getResultados);

module.exports = router;