const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Alumno = require('../models/alumno');
const bcrypt = require('bcryptjs');
exports.getAlumnos = async (req, res, next) => {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
    try {
        const alumnos = await Alumno.getAlumnos();

        res.status(200).json({ alumnos: alumnos });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}
};
exports.getAlumno = async (req, res, next) => {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {

    const dni = req.params.dni;
    try {
        const alumno = await Alumno.getAlumno(dni);
        res.status(200).json({ alumno: alumno });

    } catch (err) {
        res.status(500).json({ error: err });
    }
    }
};
exports.deleteAlumno = async (req, res, next) => {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
    if (expirado) {
      res.status(401).json({ "errors": "Sesión expirada" });
    } else {
    const dni = req.params.dni;
    try {
        const user = jwt_decode(req.headers['authorization'].sub)
        const alumno = await Alumno.deleteAlumno(dni, user);
        res.status(200).json({ alumno: alumno });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}
};
exports.updateAlumno = async (req, res, next) => {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
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
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            Alumno.updateAlumno(req.body,hashedPassword, user).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ alumno: "success" });
            }).catch(function () {
                console.log("Promise Rejected");
            });


        } catch (err) {

            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }}
};
exports.createAlumno = async (req, res, next) => {
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
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
            console.log("Usuario => " + user)
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            Alumno.createAlumno(req.body, hashedPassword, user).then(function (result) {
                res.status(201).json({ alumno: "success" });
            }).catch(function (err) {
                res.status(409).json({ message: "no se ha podido crear el alumno:" + err });
            });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}
};