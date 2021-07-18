const express = require('express');

const router = express.Router();

const LogSesion = require('../models/log_sesion');

const logSesionController = require('../controllers/log_sesion');

router.get('/', logSesionController.getSesions);

module.exports = router;