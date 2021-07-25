const express = require('express');

const router = express.Router();

const LogSesion = require('../models/log');

const logSesionController = require('../controllers/log');

router.get('/', logSesionController.getSesions);

module.exports = router;