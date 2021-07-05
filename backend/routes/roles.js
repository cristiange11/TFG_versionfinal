const express = require('express');

const router = express.Router();

const Roles = require('../models/roles');

const rolesController = require('../controllers/roles');

router.get('/', rolesController.getRoles);

router.get('/rol', rolesController.getRol);

module.exports = router;