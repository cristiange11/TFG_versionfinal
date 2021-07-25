const express = require('express');

const router = express.Router();

const Log = require('../models/log');

const logController = require('../controllers/log');

router.get('/', logController.getLogs);

module.exports = router;