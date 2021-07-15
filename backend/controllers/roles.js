const Roles = require('../models/roles');

exports.getRoles = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
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
};
exports.getRol = async (req, res, next) => {
  console.log(req.headers);
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
  console.log(expirado)
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
};