const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Modulo = require('../models/modulo');

exports.getModulos = async (req, res, next) => {
  
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("entro a obtener los modulos")
      const modulos = await Modulo.getModulos(req.params.fpDual);

      res.status(200).json({ modulos: modulos });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

};
exports.deleteModulo = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
     
      const user = jwt_decode(req.headers['authorization']).sub;
      await Modulo.deleteModulo(req.params.codigo, user);

      res.status(201).json({ message: "success" });

    } catch (err) {
      res.status(409).json({ error: err });
    }
  }
};
exports.updateModulo = async (req, res, next) => {
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
        Modulo.updateModulo(req.body,user).then(function (result) {
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
exports.createModulo = async (req, res, next) => {
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
        Modulo.createModulo(req.body, user).then(function (result) {
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
};