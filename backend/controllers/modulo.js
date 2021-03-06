const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Modulo = require('../models/modulo');
//Método utilizado para obtener un listado de módulos asociados a un FP
exports.getModulos = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']  ));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulos(req.params.fpDual);

        res.status(200).json({ modulos: modulos });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener los módulos asociados al prof
exports.getModulosProf = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulosProf(req.params.dni);
        res.status(200).json({ modulos: modulos });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener los módulos asociados al tutor
exports.getModulosTut = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulosTut(req.params.dni);
        res.status(200).json({ modulos: modulos });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener los módulos del alumno
exports.getModulosAlum = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulosAlum(req.params.dni);
        res.status(200).json({ modulos: modulos });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para obtener los módulos que el alumno no ha aprobado
exports.getModulosAlumUpdate = async (req, res, next) => {

  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulosAlumUpdate(req.params.dni, req.params.fpDual);

        res.status(200).json({ modulos: modulos });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para eliminar un módulo
exports.deleteModulo = async (req, res, next) => {
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
        await Modulo.deleteModulo(req.params.codigo, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {
          res.status(409).json({ "errors": "no se ha podido borrar el modulo" });
        });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para eliminar todo lo asociado al módulo
exports.deleteAllByModulo = async (req, res, next) => {
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
        await Modulo.deleteAllByModulo(req.params.codigo, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {

          res.status(409).json({ "errors": "no se ha podido borrar el modulo" });
        });

      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
};
//Método utilizado para actualizar el módulo
exports.updateModulo = async (req, res, next) => {
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
          await Modulo.updateModulo(req.body, user).then(function (result) {
            res.status(201).json({ message: "sucess" });
          }).catch(function () {
            res.status(401).json({ "errors": "no se ha podido actualizar el módulo" });
          });
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    }
  }
}
//Método utilizado para crear el módulo
exports.createModulo = async (req, res, next) => {
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
          await Modulo.createModulo(req.body, user).then(function (result) {
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