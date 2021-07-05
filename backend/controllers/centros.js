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
  const codigo_centro = req.body.codigo_centro;
  try {
    const centro = await Centro.getCentro(codigo_centro);
    res.status(200).json({ message: centro });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.deleteCentro = async (req, res, next) => {
  const codigo_centro = req.body.codigo_centro;
  try {
    const centro = await Centro.deleteCentro(codigo_centro);
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
  const codigo_centro=req.body.codigo_centro;
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
      codigo_centro: codigo_centro
    };
    
    const result = Centro.updateCentro(cent).then(function (result) {
      console.log("Promise Resolved");

      res.status(201).json({ message: us });
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