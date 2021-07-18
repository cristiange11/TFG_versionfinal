const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Fpdual = require('../models/fp_dual');
const FP_dual = require('../models/fp_dual');

exports.getFpByCentro = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {

    const codigoCentro = req.params.codigoCentro;

    try {
      const fp = await Fpdual.getNombreFPByCentro(codigoCentro);

      res.status(200).json({ fps: fp });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};