const { validationResult } = require('express-validator');

const Empresa = require('../models/empresa');

exports.getEmpresas = async (req, res, next) => {
  
  try {
    
    const empresas = await Empresa.getEmpresas();

    res.status(200).json({ empresas: empresas });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.getEmpresa = async (req, res, next) => {
  const CIF = req.params.CIF;
  try {
    const empresa = await Empresa.getEmpresa(CIF);
    res.status(200).json({ message: empresa });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.deleteEmpresa = async (req, res, next) => {
  const CIF = req.params.CIF;
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
exports.updateEmpresa = async (req, res, next) => {
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
  const CIF=req.body.CIF;
  const direccion = req.body.direccion;
  const nombre = req.body.nombre;
  const tipo = req.body.tipo;
  const correo = req.body.correo;
  const telefono = req.body.telefono;
  const url = req.body.url;

  try {
    const empresa = {
      CIF: CIF,
      direccion: direccion,
      nombre: nombre,
      tipo: tipo,
      correo: correo,
      telefono: telefono,
      url: url
    };
    
    const result = Empresa.updateEmpresa(empresa).then(function (result) {
      console.log("Promise Resolved");

      res.status(201).json({ message: empresa });
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
exports.createEmpresa = async (req, res, next) => {
    
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
    const CIF=req.body.CIF;
    const direccion = req.body.direccion;
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const url = req.body.url;
  
    try {
      const empresa = {
        CIF: CIF,
        direccion: direccion,
        nombre: nombre,
        tipo: tipo,
        correo: correo,
        telefono: telefono,
        url: url
      };
      
      const result = Empresa.createEmpresa(empresa).then(function (result) {
        console.log("Promise Resolved");
  
        res.status(201).json({ message: empresa });
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