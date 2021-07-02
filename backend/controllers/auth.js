const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
exports.signup = async (req, res , next) => {
   
    const errors= validationResult(req);
  
    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() });
    } 
    
    const dni= req.body.dni;
    const nombre= req.body.nombre;
    const apellidos= req.body.apellidos;
    const correo= req.body.correo;
    const movil= req.body.movil;
    const direccion= req.body.direccion;
    const password= req.body.password;
    const genero= req.body.genero;
    const cp= req.body.cp;
    const rol= req.body.rol;
    const fecha_nacimiento= req.body.fecha_nacimiento;
    const codigo_centro= req.body.codigo_centro;  
    const fp_dual= req.body.fp_dual;  
    
    try{
       
        const hashedPassword = await bcrypt.hash(password,12);
        
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
        
        console.log(us.genero);
        const result=  User.save(us).then(function (result) {
          console.log("Promise Resolved");
          console.log(result);
          res.status(201).json({ message: 'User registered!' });
     }).catch(function () {
          console.log("Promise Rejected");
     });

        
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.login = async (req, res, next) => {
  const dni = req.body.dni;
  const password = req.body.password;
  
  try {
    const user =  User.find(dni);
    console.log(user.dni)
    if (user[0].length !== 1) {
      const error = new Error('No se ha encontrado ningún usuario con ese DNI.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Contraseña incorrecta');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        dni: storedUser.dni,
        correo: storedUser.correo,
        rol: storedUser.rol
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userDni: storedUser.dni });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
