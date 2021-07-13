const { validationResult } = require('express-validator');

const Centro = require('../models/centro');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken')
exports.getNombreCentros = async (req, res, next) => {
  try {
    const centros = await Centro.getNombreCentros();

    res.status(200).json({ message: centros });

  } catch (err) {
    res.status(500).json({ error: err });
  }

};
exports.getCentros = async (req, res, next) => {

  try {
    const centros = await Centro.getCentros();

    res.status(200).json({ centros: centros });
  } catch (err) {
    res.status(500).json({ error: err });
  }

};
exports.getCentro = async (req, res, next) => {
  const codigoCentro = req.params.codigoCentro;
  try {
    const centro = await Centro.getCentro(codigoCentro);
    res.status(200).json({ message: centro });

  } catch (err) {
    res.status(500).json({ error: err });
  }

};
exports.deleteCentro = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if(expirado){
    res.status(401).json({ "errors": "Sesión expirada" });
  }
  try {
    const centro = await Centro.deleteCentro(req.params.codigoCentro)
      
      res.status(201).json({ message: "success" });
    
   

  } catch (err) {
    res.status(409).json({ error: err });
  }

};
exports.updateCentro = async (req, res, next) => {
  const errors = validationResult(req);
  const resu = errors.array();
  const resJSON=[{
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
      const result = Centro.updateCentro(req.body).then(function (result) {
        console.log("Promise Resolved");

        res.status(201).json({ message: "sucess" });
      }).catch(function () {
        res.status(401).json({ message: "no se ha podido actualizar el centro:" + err });

      });


    } catch (err) {

      res.status(500).json({ error: err });
    }
  }
}
exports.createCentro = async (req, res, next) => {
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
      const result = Centro.createCentro(req.body).then(function (result) {
        console.log("Promise Resolved");

        res.status(201).json({ message: "success" });
      }).catch(function () {
        res.status(401).json({ message: "no se ha podido crear el centro:" + err });

      });


    } catch (err) {

      res.status(500).json({ error: err });
    }
  }
};