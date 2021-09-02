const express = require('express');

const router = express.Router();

const Roles = require('../models/roles');

const rolesController = require('../controllers/roles');
//Definir rutas y comprobar que los campos son correctos
router.get('/', rolesController.getRoles);

router.get('/rol', rolesController.getRol);

module.exports = router;