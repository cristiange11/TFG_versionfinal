const express = require('express');

const router = express.Router();

const LogSesion = require('../models/logs/logSesion');

const logSesionController = require('../controllers/logs/logSesion');

router.get('/', logSesionController.getSesions);

module.exports = router;