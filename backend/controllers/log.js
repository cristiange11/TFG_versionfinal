const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Log = require('../models/log');

exports.getSesions = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {

    try {
      const sesiones = await Log.getLogs();

      res.status(200).json({ logs: sesiones });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};