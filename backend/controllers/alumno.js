const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Alumno = require('../models/alumno');
const bcrypt = require('bcryptjs');
//Método que sirve para obtener todos los alumnos
exports.getAlumnos = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
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
    }
};
//Método utilizado para obtener las calificaciones de un alumno
exports.getCalificacionesAlumno = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const alumnos = await Alumno.getCalificacionesAlumno(req.params.dni);
                res.status(200).json({ alumnos: alumnos });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para obtener los alumnos de un módulo
exports.getAlumnosByModulo = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const alumnos = await Alumno.getAlumnosByModulo(req.params.codigoModulo);
                res.status(200).json({ alumnos: JSON.stringify(alumnos) });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para obtener los alumnos de un módulo para añadirles encuestas
exports.getAlumnosByModuloEncuesta = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const alumnos = await Alumno.getAlumnosByModuloEncuesta(req.params.codigoModulo);
                res.status(200).json({ alumnos: JSON.stringify(alumnos) });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para obtener un alumno
exports.getAlumno = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const alumno = await Alumno.getAlumno(req.params.dni);
                res.status(200).json({ alumno: JSON.stringify(alumno) });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para eliminar un alumno
exports.deleteAlumno = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            const dni = req.params.dni;
            try {
                const user = jwt_decode(req.headers['authorization'].sub)
                await Alumno.deleteAlumno(dni, user).then(function (result) {
                    res.status(201).json({ message: "success" });
                  }).catch(function (err) {
                    res.status(409).json({ "errors" : "no se ha podido borrar el alumno" });
                  });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para actualizar un alumno
exports.updateAlumno = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
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
                    Alumno.updateAlumno(req.body, hashedPassword, user).then(function (result) {
                        res.status(201).json({ alumno: "success" });
                    }).catch(function () {
                        res.status(401).json({ errors: "No se ha podido actualizar el alumno" });
                    });
                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};
//Método utilizado para crear un alumno
exports.createAlumno = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'],   ));
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
                    Alumno.createAlumno(req.body, hashedPassword, user).then(function (result) {
                        res.status(201).json({ alumno: "success" });
                    }).catch(function (err) {
                        res.status(409).json({ "errors": "no se ha podido crear el alumno"  });
                    });
                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};