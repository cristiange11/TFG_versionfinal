const { validationResult } = require('express-validator');

const Centro = require('../models/centro');

exports.getNombreCentros = async (req, res, next) => {
  try {
    const centros = await Centro.getNombreCentros();

    res.status(200).json({ message: centros });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.getCentros = async (req, res, next) => {

  try {
    const centros = await Centro.getCentros();
    
    res.status(200).json({ centros: centros });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.getCentro = async (req, res, next) => {
  const codigoCentro = req.params.codigoCentro;
  try {
    const centro = await Centro.getCentro(codigoCentro);
    res.status(200).json({ message: centro });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.deleteCentro = async (req, res, next) => {
  const codigoCentro = req.params.codigoCentro;
  try {
    const centro = await Centro.deleteCentro(codigoCentro);
    res.status(200).json({ message: centro });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.updateCentro = async (req, res, next) => {
  const errors = validationResult(req);
  const resu = errors.array();
  var cadena = "";
  resu.forEach(element => {
    cadena += element.msg + "\n";

  });

  if (!errors.isEmpty()) {
    res.status(409).json({ message: cadena });
  }
  else{
  const codigoCentro=req.body.codigoCentro;
  const correo = req.body.correo;
  const telefono = req.body.telefono;
  const provincia = req.body.provincia;
  const nombre = req.body.nombre;
  const cp = req.body.cp;
  const direccion = req.body.direccion;

  try {
    const cent = {
      correo: correo,
      telefono: telefono,
      provincia: provincia,
      nombre: nombre,
      cp: cp,
      direccion: direccion,
      codigoCentro: codigoCentro
    };
    
    const result = Centro.updateCentro(cent).then(function (result) {
      console.log("Promise Resolved");

      res.status(201).json({ message: cent });
    }).catch(function () {
      console.log("Promise Rejected");
    });


  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }}
};