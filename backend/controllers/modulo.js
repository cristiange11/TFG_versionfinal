const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Modulo = require('../models/modulo');

exports.getModulos = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

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

exports.getModulosProf = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
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
exports.getModulosTut = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
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
exports.getModulosAlum = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

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
exports.getModulosAlumUpdate = async (req, res, next) => {
  console.log("ENTRO")
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const modulos = await Modulo.getModulosAlumUpdate(req.params.dni, req.params.fpDual);

        res.status(200).json({ modulos: modulos });
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
      }
    }
  }
};
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
          res.status(409).json({ "errors" : "no se ha podido borrar el modulo" });
        });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
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
          
          res.status(409).json({ "errors" : "no se ha podido borrar el modulo" });
        });

      } catch (err) {
        
        res.status(500).json({ error: err });
      }
    }
  }
};
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