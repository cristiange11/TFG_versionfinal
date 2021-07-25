const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Profesor = require('../models/profesor');
const bcrypt = require('bcryptjs');
exports.getProfesores = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
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
};
exports.deleteProfesor = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], /* { header: true } */));
    console.log(expirado)
    if (expirado) {
        res.status(401).json({ "errors": "Sesión expirada" });
    } else {
        const dni = req.params.dni;

        try {
            const user = jwt_decode(req.headers['authorization']).sub;
            const profesor = await Profesor.deleteProfesor(dni,user);
            res.status(200).json({ profesor: "sucess" });

        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};
exports.updateProfesor = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
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
                Profesor.updateProfesor(req.body,hashedPassword, user).then(function (result) {
                    console.log("Promise Resolved");

                    res.status(201).json({ profesor: "sucess" });
                }).catch(function () {
                    console.log("Promise Rejected");
                    res.status(401).json({ message: "no se ha podido actualizar el profesor:" + err });
                });


            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.createProfesor = async (req, res, next) => {
    console.log(req.headers);
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
                Profesor.createProfesor(req.body, hashedPassword, user).then(function (result) {
                    console.log("Promise Resolved");
                    res.status(201).json({ profesor: "success" });
                }).catch(function () {
                    console.log("Promise Rejected");
                    res.status(401).json({ message: "no se ha podido crear el profesor:" + err });
                });


            } catch (err) {

                res.status(500).json({ error: err });
            }
        }
    }
};