const express = require('express');

const router = express.Router();

const LogSesion = require('../models/logs/log_sesion');

const logSesionController = require('../controllers/logs/log_sesion');

router.get('/', logSesionController.getSesions);

module.exports = router;