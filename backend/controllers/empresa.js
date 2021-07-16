const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Empresa = require('../models/empresa');

exports.getEmpresas = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {

      const empresas = await Empresa.getEmpresas();

      res.status(200).json({ empresas: empresas });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};

exports.deleteEmpresa = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    const CIF = req.params.CIF;
    try {
      const centro = await Centro.deleteCentro(codigoCentro);
      res.status(200).json({ message: centro });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

};
exports.updateEmpresa = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    const errors = validationResult(req);
    const resu = errors.array();
    const resJSON = [{
      param: String,
      message: String,
    }]
    resu.forEach(element => {
      resJSON.push({
        param: element.param,
        message: element.msg
      })
    });

    if (!errors.isEmpty()) {
      res.status(409).json({ "errors": resJSON });
    }
    else {

      try {
        const result = Empresa.updateEmpresa(req.body).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "success" });
        }).catch(function () {
          console.log("Promise Rejected");
          res.status(401).json({   "errors" : "no se ha podido actualizar la empresa"  });
        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
};
exports.createEmpresa = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    const errors = validationResult(req);
    const resu = errors.array();
    const resJSON = [{
      param: String,
      message: String,
    }]
    resu.forEach(element => {
      resJSON.push({
        param: element.param,
        message: element.msg
      })
    });

    if (!errors.isEmpty()) {
      res.status(409).json({ "errors": resJSON });
    }
    else {

      try {

        const result = Empresa.createEmpresa(req.body).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "success" });
        }).catch(function () {
          console.log("Promise Rejected");
          res.status(401).json({ message: "no se ha podido crear la empresa:" });
        });


      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};