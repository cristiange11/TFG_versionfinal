const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Profesor = require('../models/profesor');
const bcrypt = require('bcryptjs');
exports.getProfesores = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const profesores = await Profesor.getProfesores();

                res.status(200).json({ profesores: profesores });

            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.getProfesor = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {

                const profesor = await Profesor.getProfesor(req.params.dni);

                res.status(200).json({ profesor: JSON.stringify(profesor) });

            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.deleteProfesor = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
        
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            const dni = req.params.dni;

            try {
                const user = jwt_decode(req.headers['authorization']).sub;
                const profesor = await Profesor.deleteProfesor(dni, user).then(function (result) {
                    res.status(201).json({ message: "success" });
                  }).catch(function (err) {
                    res.status(409).json({ "errors" : "no se ha podido borrar el usuario" });
                  });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.updateProfesor = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
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
                    const hashedPassword = await bcrypt.hash(req.body.password, 12);
                    await Profesor.updateProfesor(req.body, hashedPassword, user).then(function (result) {
                        

                        res.status(201).json({ profesor: "sucess" });
                    }).catch(function () {
                        res.status(401).json({ message: "no se ha podido actualizar el profesor:" + err });
                    });


                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};
exports.createProfesor = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
        
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
                    await Profesor.createProfesor(req.body, hashedPassword, user).then(function (result) {
                        
                        res.status(201).json({ profesor: "success" });
                    }).catch(function () {
                        
                        res.status(409).json({ "errors" : "no se ha podido crear el profesor" });
                    });


                } catch (err) {

                    res.status(500).json({ error: err });
                }
            }
        }
    }
};