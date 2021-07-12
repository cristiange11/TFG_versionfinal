const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
//const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//import * as jwt from 'jsonwebtoken';
//import * as fs from "fs";

const RSA_PRIVATE_KEY = fs.readFileSync(__dirname+'/OPENSSL/private.pem');
exports.signup = async (req, res, next) => {
  
  const errors = validationResult(req);
  const resu = errors.array();
  const resJSON=[{
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
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const codigo_centro = req.body.codigo_centro;
    const fp_dual = req.body.fp_dual;

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
        fecha_nacimiento: fecha_nacimiento,
        fp_dual: fp_dual,
        codigo_centro: codigo_centro
      };


      const result = User.save(us).then(function (result) {
        console.log("Promise Resolved");

        res.status(201).json({ message: "success" });
      }).catch(function () {
        console.log("Promise Rejected");
      });


    } catch (err) {

      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  
  const dni = req.body.dni;
  const password = req.body.password;
  try {
    const userJson = await User.find(dni);
    let user = new User(userJson[0][0])
    const isEqual =  bcrypt.compare(password, user.password);

    if (!isEqual) {
      console.log("entro y no son iwales")
      res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
    else{
      /*
    const jwtBearerToken = await jwt.sign({dni, password}, {passphrase: 'proyecto final carrera'}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: user.dni
    });
    */
    const jwtBearerToken = jwt.sign({ sub: user.dni }, 'proyecto final carrera', { expiresIn: '7d' });
    console.log(jwtBearerToken);
  }
    /*
    const user = await User.find(dni).then(function (result) {
      console.log("Promise Resolved:"+user);  
      console.log("Password: " + password + " Userpassword " + user.password)
      
      //res.status(200).json({ token: "a", Dni: storedUser.dni });
     } 
      
    }).catch(function () {
      res.status(401).json({ error: 'No se ha encontrado ningún usuario con ese DNI.' });

    });
    */
  } catch (err) {
    console.log("error => "+err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getUsuarios = async (req, res, next) => {
  try {
    const usuario = await User.getUsers();
    
    
    res.status(200).json({ message: usuario });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
