const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Centro = require('../models/centro');

exports.getCentros = async (req, res, next) => {
  
  console.log(req.headers);
  
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("Entro a conseguir los centros")
      const centros = await Centro.getCentros();

      res.status(200).json({ centros: centros });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

};
exports.deleteCentro = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      console.log("codigo centro => " + req.params.codigoCentro)
      const user = jwt_decode(req.headers['authorization']).sub;
      const centro = await Centro.deleteCentro(req.params.codigoCentro,user)

      res.status(201).json({ message: "success" });



    } catch (err) {
      res.status(409).json({ error: err });
    }
  }
};
exports.updateCentro = async (req, res, next) => {
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
        const user = jwt_decode(req.headers['authorization']).sub;
        const result = Centro.updateCentro(req.body,user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "sucess" });
        }).catch(function () {
          res.status(401).json({  "errors": "no se ha podido actualizar el centro"  });

        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
}
exports.deleteUserAndFPByCentro = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    console.log(req.params)
    const codigoCentro = req.params.codigoCentro;

    try {
      const user = jwt_decode(req.headers['authorization']).sub;
      const centro = await Centro.deleteUserAndFPByCentro(req.params.codigoCentro, user);

      res.status(200).json({ centro: centro });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
exports.createCentro = async (req, res, next) => {
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

        const result = Centro.createCentro(req.body, user).then(function (result) {
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