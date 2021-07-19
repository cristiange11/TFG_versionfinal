const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Fpdual = require('../models/fp_dual');
const FP_dual = require('../models/fp_dual');

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
exports.DeleteCentroAndFPsByCentro = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    console.log(req.params)
    const codigoCentro = req.params.codigoCentro;

    try {
      const fp = await Fpdual.DeleteCentroAndFPsByCentro(req.params.codigoCentro);

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
      
      const fps = await FP_dual.getFp(req.params.id);

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
      
      const fps = await FP_dual.getFps();

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
      console.log("codigo centro => " + req.params.id)
      const centro = await FP_dual.deleteFp(req.params.id)

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
        console.log("entro a updatear")
        const result = FP_dual.updateFp(req.body).then(function (result) {
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
        const user = jwt_decode(req.headers['authorization']).sub;
        const result = FP_dual.createFp(req.body, user).then(function (result) {
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