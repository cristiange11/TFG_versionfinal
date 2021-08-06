const Resultados = require('../models/resultadoEncuesta');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
exports.getResultados = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));

    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const resultados = await Resultados.getResultados();

        res.status(200).json({ resultados: resultados });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};

