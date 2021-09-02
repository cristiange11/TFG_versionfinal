const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Log = require('../models/log');
//Método que sirve para obtener un listado de logs
exports.getLogs = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {

      try {
        const log = await Log.getLogs();
        res.status(200).json({ logs: log });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};