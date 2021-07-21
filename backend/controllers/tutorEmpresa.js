const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const TutorEmpresa = require('../models/tutorEmpresa');
const bcrypt = require('bcryptjs');
exports.getTutores = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
    console.log(expirado)
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
};
exports.deleteTutor = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
    console.log(expirado)
    if (expirado) {
        res.status(401).json({ "errors": "Sesión expirada" });
    } else {
        const dni = req.params.dni;
        try {
            const user = jwt_decode(req.headers['authorization']).sub;
            const tutor = await TutorEmpresa.deleteTutor(dni,user);
            res.status(200).json({ message: "success" });

        } catch (err) {
            res.status(500).json({ error: err });

        }
    }
};
exports.updateTutor = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
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
                const result = TutorEmpresa.updateTutor(req.body,user).then(function (result) {
                    console.log("Promise Resolved");

                    res.status(201).json({ message: "sucess" }); W
                }).catch(function () {
                    console.log("Promise Rejected");
                });


            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
exports.createTutor = async (req, res, next) => {
    console.log(req.headers);
    var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization'], { header: true }));
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
            console.log("entro a crear tutor " + req.body)
            try {
                const user = jwt_decode(req.headers['authorization']).sub;

                const hashedPassword = await bcrypt.hash(req.body.password, 12);
                console.log("prueba")
                const result = TutorEmpresa.createTutor(req.body, hashedPassword, user).then(function (result) {
                    console.log("Promise Resolved");

                    res.status(201).json({ message: "success" });
                }).catch(function () {
                    console.log("Promise Rejected");
                });


            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};