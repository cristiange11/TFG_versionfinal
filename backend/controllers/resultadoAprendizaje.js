const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const ResultadoAprendizaje = require('../models/resultadoAprendizaje');

exports.getResultadoAprendizajes = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else{
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      const resultadosAprendizaje = await ResultadoAprendizaje.getResultadoAprendizajes(req.params.codigoModulo);

      res.status(200).json({ resultadoAprendizaje: resultadosAprendizaje });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
};
exports.deleteResultadoAprendizaje = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else{
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("entro a comprobar")
      const user = jwt_decode(req.headers['authorization']).sub;
      await ResultadoAprendizaje.deleteResultadoAprendizaje(req.params.id, user);

      res.status(201).json({ message: "success" });

    } catch (err) {
      res.status(409).json({ error: err });
    }
  }
}
};
exports.updateResultadoAprendizaje = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else{
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
        const user = jwt_decode(req.headers['authorization']).sub;
        console.log(req.body)
        ResultadoAprendizaje.updateResultadoAprendizaje(req.body,user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "sucess" });
        }).catch(function () {
          res.status(401).json({  "errors": "no se ha podido actualizar el módulo"  });

        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
}
}
exports.createResultadoAprendizaje = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else{
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
        const user = jwt_decode(req.headers['authorization']).sub;
        ResultadoAprendizaje.createResultadoAprendizaje(req.body, user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "success" });
        }).catch(function () {
          res.status(401).json({ message: "no se ha podido crear el centro:" + err });

        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
  }
};