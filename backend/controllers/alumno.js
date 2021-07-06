const { validationResult } = require('express-validator');

const Alumno = require('../models/alumno');

exports.getAlumnos = async (req, res, next) => {
    try {
        const alumnos = await Alumno.getAlumnos();

        res.status(200).json({ alumnos: alumnos });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.getAlumno = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const alumno = await Alumno.getAlumno(dni);
        res.status(200).json({ alumno: alumno });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};
exports.deleteAlumno = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const alumno = await Alumno.deleteAlumno(dni);
        res.status(200).json({ alumno: alumno });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};/*
exports.updateAlumno = async (req, res, next) => {
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
        const numero_expediente = req.body.numero_expediente;

        try {
            const alumno = {
                dni: dni,
                numero_expediente: numero_expediente
            };

            const result = Alumno.updateAlumno(alumno).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ alumno: alumno });
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
};*/
exports.createAlumno = async (req, res, next) => {

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
        const numero_expediente = req.body.numero_expediente;

        try {
            const alumno = {
                dni: dni,
                numero_expediente: numero_expediente
            };

            const result = Alumno.createAlumno(alumno).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ alumno: alumno });
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