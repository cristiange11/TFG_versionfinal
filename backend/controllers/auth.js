const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const promisePool = require('../util/database');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
var datetime = require('node-datetime');
const RSA_PRIVATE_KEY = fs.readFileSync(__dirname + '/OPENSSL/private.pem');
exports.signup = async (req, res, next) => {

  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
  console.log("cumpruebo si esta expirado" + expirado)
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  }


  else {

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

      const dni = req.body.dni;
      const nombre = req.body.nombre;
      const apellidos = req.body.apellidos;
      const correo = req.body.correo;
      const movil = req.body.movil;
      const direccion = req.body.direccion;
      const password = req.body.password;
      const genero = req.body.genero;
      const cp = req.body.cp;
      const rol = req.body.rol;
      const fechaNacimiento = req.body.fechaNacimiento;
      const codigoCentro = req.body.codigoCentro;
      const fpDual = req.body.fpDual;

      try {

        const hashedPassword = await bcrypt.hash(password, 12);

        const us = {
          dni: dni,
          nombre: nombre,
          genero: genero,
          apellidos: apellidos,
          correo: correo,
          movil: movil,
          direccion: direccion,
          password: hashedPassword,
          cp: cp,
          rol: rol,
          fechaNacimiento: fechaNacimiento,
          fpDual: fpDual,
          codigoCentro: codigoCentro
        };

        const user = jwt_decode(req.headers['authorization']).sub;
        const result = User.save(us, user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ message: "success" });
        }).catch(function (err) {
          console.log("Promise Rejected  " + err);
          res.status(401).json({ errors: "no se ha podido crear el usuario:" });
        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
};

exports.login = async (req, res, next) => {

  const dni = req.body.dni;
  const password = req.body.password;
  try {
    const queryResult = await User.find(dni);
    if (queryResult[0].length > 0) {
      const userJson = queryResult[0][0]

      let user = new User(userJson)
      const isEqual = await bcrypt.compare(password, user.password);


      if (!isEqual) {
        await promisePool.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_LOGIN','Credenciales incorrectas ' ,'${req.body.dni}',sysdate(), 'login')`);            

        res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
      else {
        await promisePool.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha logado usuario ' ,'${req.body.dni}',sysdate(), 'login')`);            

        const jwtBearerToken = jwt.sign({ sub: user.dni }, 'proyecto final carrera', { expiresIn: '24h' });
        console.log("Token login => " + jwtBearerToken);
        const resJSON = { "result": { "user": userJson, "token": jwtBearerToken } }
        res.status(200).json(resJSON);
      }
    } else {
      res.status(401).json({ errors: 'Credenciales incorrectas.' });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;

    }
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {
    try {
      const user = jwt_decode(req.headers['authorization']).sub;
      console.log(req.params)
      await User.deleteUser(req.params.dni, user);
      res.status(200).json({ message: "sucesss" });

    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err });
    }
  }

};

exports.getUsuarios = async (req, res, next) => {
  var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
  if (expirado) {
    res.status(401).json({ "errors": "Sesión expirada" });
  } else {

    try {
      const usuario = await User.getUsers();
      res.status(200).json({ "usuarios": usuario[0] });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
exports.updateUsuario = async (req, res, next) => {
  console.log("Hola compruebo si entro")
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
        console.log("campos " + req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const result = User.updateUser(req.body, hashedPassword, user).then(function (result) {
          console.log("Promise Resolved");

          res.status(201).json({ user: req.body });
        }).catch(function () {
          res.status(401).json({ errors: "No se ha podido actualizar el usuario" });

        });


      } catch (err) {

        res.status(500).json({ error: err });
      }
    }
  }
}