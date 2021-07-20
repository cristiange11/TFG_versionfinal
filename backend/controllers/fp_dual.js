const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Fpdual = require('../models/fp_dual');

exports.getFpByCentro = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
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
};
exports.DeleteUsuariosByFP = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {

    try {
      const user = jwt_decode(req.headers['authorization']).sub;
      const fp = await Fpdual.DeleteUsuariosByFP(req.params.id,user);

      res.status(200).json({ fps: fp });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
exports.getFp = async (req, res, next) => {
  
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
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

};
exports.getFps = async (req, res, next) => {
  
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("entro a obtener los fps")
      const fps = await Fpdual.getFps();

      res.status(200).json({ fps: fps });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

};
exports.getFpsConPlazasDisponibles = async (req, res, next) => {
  
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
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

};
exports.deleteFp = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("entro a comprobar")
      const user = jwt_decode(req.headers['authorization']).sub;
      const centro = await Fpdual.deleteFp(req.params.id, user);

      res.status(201).json({ message: "success" });

    } catch (err) {
      res.status(409).json({ error: err });
    }
  }
};
exports.updateFp = async (req, res, next) => {
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
        const result = Fpdual.updateFp(req.body,user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "sucess" });
        }).catch(function () {
          res.status(401).json({  "errors": "no se ha podido actualizar el FP"  });

        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
}
exports.createFp = async (req, res, next) => {
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
        console.log("Hola entro a registrar")
        const user = jwt_decode(req.headers['authorization']).sub;
        const result = Fpdual.createFp(req.body, user).then(function (result) {
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