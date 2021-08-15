const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Empresa = require('../models/empresa');

exports.getEmpresas = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
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
  }
};
exports.getEmpresasByCentro = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {

        const empresas = await Empresa.getEmpresasByCentro(req.params.codigoCentro);

        res.status(200).json({ empresas: empresas });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.getFpAndCentroByEmpresa = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {

        const empresas = await Empresa.getFpAndCentroByEmpresa(req.params.idEmpresa);

        res.status(200).json({ empresas: empresas });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.getEmpresasByFp = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {

        const empresas = await Empresa.getEmpresasByFp(req.params.fpDual);

        res.status(200).json({ empresas: empresas });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
exports.deleteTutorEmpresaByEmpresa = async (req, res, next) => {
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
        await Empresa.deleteTutorEmpresaByEmpresa(req.params.id, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {

          res.status(409).json({ "errors": "no se ha podido borrar el usuario" });
        });;


      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }

};
exports.deleteEmpresa = async (req, res, next) => {
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
        await Empresa.deleteEmpresa(req.params.id, user).then(function (result) {
          res.status(201).json({ message: "success" });
        }).catch(function (err) {

          res.status(409).json({ "errors": "no se ha podido borrar la empresa" });
        });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }

};
exports.updateEmpresa = async (req, res, next) => {
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
          await Empresa.updateEmpresa(req.body, user).then(function (result) {


            res.status(201).json({ message: "success" });
          }).catch(function () {

            res.status(401).json({ "errors": "no se ha podido actualizar la empresa" });
          });


        } catch (err) {

          res.status(500).json({ error: err });
        }
      }
    }
  }
};
exports.createEmpresa = async (req, res, next) => {
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
          await Empresa.createEmpresa(req.body, user).then(function (result) {


            res.status(201).json({ message: "success" });
          }).catch(function (err) {
            res.status(401).json({ message: "no se ha podido crear la empresa:" });
          });


        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    }
  }
};