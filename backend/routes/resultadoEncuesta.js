const express = require('express');

const router = express.Router();

const resultadoController = require('../controllers/resultadoEncuesta');

router.get('/', resultadoController.getResultados);

module.exports = router;