const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Fpdual = require('../models/fpDual');
//Método utilizado para obtener un listado de los FP asociados a un centro
exports.getFpByCentro = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
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
  }
};
//Método para eliminar todo lo asociado a un FP
exports.DeleteUsuariosByFP = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const user = jwt_decode(req.headers['authorization']).sub;
        await Fpdual.DeleteUsuariosByFP(req.params.id, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {
          res.status(409).json({ "errors": "no se ha podido borrar el fpDual" });
        });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener un FP
exports.getFp = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const fps = await Fpdual.getFp(req.params.id);
        res.status(200).json({ fps: fps });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener un listado de todos los FPs
exports.getFps = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const fps = await Fpdual.getFps();
        res.status(200).json({ fps: fps });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para conocer los FP duales que tengan como mínimo 1 plaza disponible
exports.getFpsConPlazasDisponibles = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const fps = await Fpdual.getFpsConPlazasDisponibles(req.params.codigoCentro);
        res.status(200).json({ fps: fps });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para eliminar un FP
exports.deleteFp = async (req, res, next) => {
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
        await Fpdual.deleteFp(req.params.id, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {
          res.status(409).json({ "errors": "no se ha podido borrar el usuario" });
        });
      } catch (err) {
        res.status(409).json({ error: err });
      }
    }
  }
};
//Método utilziado para actualizar un FP
exports.updateFp = async (req, res, next) => {
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
          await Fpdual.updateFp(req.body, user).then(function (result) {
            res.status(201).json({ message: "sucess" });
          }).catch(function () {
            res.status(401).json({ "errors": "no se ha podido actualizar el FP" });
          });
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    }
  }
};
//Método utilizado para obtener los FPs de un centro
exports.getFpsByAdminCentro = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const fp = await Fpdual.getFpsByAdminCentro(req.params.codigoCentro);
        res.status(200).json({ fps: fp });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para crear un FP
exports.createFp = async (req, res, next) => {
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
          await Fpdual.createFp(req.body, user).then(function (result) {
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