const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
exports.signup = async (req, res , next) => {
    const errors= validationResult(req);

    if(!errors.isEmpty()) return
    
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
    const nombre_usuario= req.body.nombre_usuario;
    const codigo_centro= req.body.codigo_centro;  
    try{
        const hashedPassword = await bcrypt.hash(password);

        const us = {
            dni: dni,
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            movil: movil,
            direccion: direccion,
            password: hashedPassword,
            genero: genero,
            cp: cp,
            rol: rol,
            fecha_nacimiento: fecha_nacimiento,
            nombre_usuario: nombre_usuario,
            codigo_centro: codigo_centro
        }
        const result= await User.save(us);

        res.status(201).json({ message: 'User registered!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};