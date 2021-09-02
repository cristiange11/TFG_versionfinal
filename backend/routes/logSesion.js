const express = require('express');

const router = express.Router();

const Log = require('../models/log');

const logController = require('../controllers/log');
//Definir rutas y comprobar que los campos son correctos
router.get('/', logController.getLogs);

module.exports = router;