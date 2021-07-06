const Roles = require('../models/roles');

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Roles.getRoles();

    res.status(200).json({ roles: roles });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
exports.getRol = async (req, res, next) => {
    const id = req.body.id;

    try {
      const rol = await Roles.getRol(id);
  
      res.status(200).json({ rol: rol });
  
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  
  };