const { validationResult } = require('express-validator');

const Fpdual = require('../models/fp_dual');

exports.getFpByCentro = async (req, res, next) => {
  const codigo_centro = req.body.codigo_centro;
  console.log(req.body)
  try {
    const fp = await Fpdual.getNombreFPByCentro(codigo_centro);

    res.status(200).json({ fps: fp });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};