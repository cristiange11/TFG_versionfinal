const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Fp = require('../models/fp_dual');

const fpController = require('../controllers/fp_dual');

router.get('/:codigoCentro', fpController.getFpByCentro);

router.delete('/:codigoCentro', fpController.DeleteCentroAndFPsByCentro);

module.exports = router;
