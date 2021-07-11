const { validationResult } = require('express-validator');

const TutorEmpresa = require('../models/tutorEmpresa');

exports.getTutores = async (req, res, next) => {
    try {
        const tutores = await TutorEmpresa.getTutores();

        res.status(200).json({ tutores: tutores });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.getTutor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const tutor = await TutorEmpresa.getTutor(dni);
        res.status(200).json({ tutor: tutor });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.deleteTutor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const tutor = await TutorEmpresa.deleteTutor(dni);
        res.status(200).json({ message: tutor });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.updateTutor = async (req, res, next) => {
    const errors = validationResult(req);
    const resu = errors.array();
    var cadena = "";
    resu.forEach(element => {
        cadena += element.msg + "\n";

    });

    if (!errors.isEmpty()) {
        res.status(409).json({ message: cadena });
    }
    else {
        const dni = req.body.dni;
        const modulo_empresa = req.body.modulo_empresa;
        const cif_empresa = req.body.cif_empresa;

        try {
            const tutor = {
                dni: dni,
                modulo_empresa: modulo_empresa,
                cif_empresa: cif_empresa
            };

            const result = TutorEmpresa.updateTutor(tutor).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ message: tutor });
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
exports.createTutor = async (req, res, next) => {

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

        try {
            
            const result = TutorEmpresa.createTutor(req.body).then(function (result) {
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