const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const TutorEmpresa = require('../models/tutorEmpresa');
const bcrypt = require('bcryptjs');
exports.getTutores = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));

        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const tutores = await TutorEmpresa.getTutores();

                res.status(200).json({ tutores: tutores });

            } catch (err) {
                res.status(500).json({ error: err });

            }
        }
    }
};
exports.getTutorByModuloEncuesta = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const tutores = await TutorEmpresa.getTutorByModuloEncuesta(req.params.codigoModulo);

                res.status(200).json({ tutores: JSON.stringify(tutores) });

            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.getTutor = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {

                const tutor = await TutorEmpresa.getTutor(req.params.dni);
                res.status(200).json({ tutor: JSON.stringify(tutor) });

            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.deleteTutor = async (req, res, next) => {
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
                const tutor = await TutorEmpresa.deleteTutor(dni, user).then(function (result) {
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
exports.updateTutor = async (req, res, next) => {
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
        
                    await TutorEmpresa.updateTutor(req.body, hashedPassword, user).then(function (result) {
                        

                        res.status(201).json({ profesor: "sucess" });
                    }).catch(function (err) {
                        res.status(401).json({ message: "no se ha podido actualizar el tutor:" + err });
                    });


                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};
exports.createTutor = async (req, res, next) => {
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
                    
                    await TutorEmpresa.createTutor(req.body, hashedPassword, user).then(function (result) {
                        

                        res.status(201).json({ message: "success" });
                    }).catch(function () {
                        res.status(409).json({ "errors" : "no se ha podido crear el tutor" });
                    });


                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};