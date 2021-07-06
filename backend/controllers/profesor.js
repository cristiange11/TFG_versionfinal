const { validationResult } = require('express-validator');

const Profesor = require('../models/profesor');

exports.getProfesores = async (req, res, next) => {
    try {
        const profesores = await Profesor.getProfesores();

        res.status(200).json({ profesores: profesores });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.getProfesor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const profesor = await Profesor.getAlumno(dni);
        res.status(200).json({ profesor: profesor });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.deleteProfesor = async (req, res, next) => {
   
    const dni = req.params.dni;
    console.log(dni)
    try {
        const profesor = await Profesor.deleteProfesor(dni);
        res.status(200).json({ profesor: profesor });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.updateProfesor = async (req, res, next) => {
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
        const departamento = req.body.departamento;

        try {
            const profesor = {
                dni: dni,
                departamento: departamento
            };
            console.log(profesor)
            const result = Profesor.updateProfesor(profesor).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ profesor: profesor });
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
exports.createProfesor = async (req, res, next) => {

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
        const departamento = req.body.departamento;

        try {
            const profesor = {
                dni: dni,
                departamento: departamento
            };
            
            const result = Profesor.createProfesor(profesor).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ profesor: profesor });
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