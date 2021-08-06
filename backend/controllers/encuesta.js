const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Encuesta = require('../models/encuesta');

exports.getEncuestas = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {

        const encuestas = await Encuesta.getEncuestas(req.params.codigoModulo);

        res.status(200).json({ encuestas: encuestas });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.getEncuestasByTutor = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {

        const encuestas = await Encuesta.getEncuestaByTutor(req.params.dni, req.params.codigoModulo);
        res.status(200).json({ encuestas: encuestas });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.getEncuesta = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const encuestas = await Encuesta.getEncuesta(req.params.id);

        res.status(200).json({ encuestas: encuestas });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.deleteEncuesta = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const user = jwt_decode(req.headers['authorization']).sub;
        await Encuesta.deleteEncuesta(req.params.id, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {
          res.status(409).json({ "errors" : "no se ha podido borrar el usuario" });
        });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.updateEncuesta = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
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

          Encuesta.updateEncuesta(req.body, user).then(function (result) {


            res.status(201).json({ message: "sucess" });
          }).catch(function () {
            res.status(401).json({ "errors": "no se ha podido actualizar la encuesta" });

          });


        } catch (err) {

          res.status(500).json({ error: err });
        }
      }
    }
  }
}
exports.createEncuesta = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
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
          Encuesta.createEncuesta(req.body, user).then(function (result) {


            res.status(201).json({ message: "success" });
          }).catch(function () {
            res.status(401).json({ "errors": "no se ha podido crear la encuesta:" });

          });


        } catch (err) {

          res.status(500).json({ error: err });
        }
      }
    }
  }
};