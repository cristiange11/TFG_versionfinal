const Roles = require('../models/roles');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
//Método para obtener un listado de los roles
exports.getRoles = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      try {
        const roles = await Roles.getRoles();
        res.status(200).json({ roles: roles });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};
//Método para obtener un rol
exports.getRol = async (req, res, next) => {
  if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
    res.status(406).json({ "errors": "No aceptable" });
  }
  else {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
      const id = req.body.id;
      try {
        const rol = await Roles.getRol(id);
        res.status(200).json({ rol: rol });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  }
};