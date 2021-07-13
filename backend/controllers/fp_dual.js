const { validationResult } = require('express-validator');

const Fpdual = require('../models/fp_dual');

exports.getFpByCentro = async (req, res, next) => {
  console.log(req.params)
  const codigoCentro = req.params.codigoCentro;
 
  try {
    const fp = await Fpdual.getNombreFPByCentro(codigoCentro);
    
    res.status(200).json({ fps: fp });

  } catch (err) {
    res.status(500).json({ error: err });
  }

};