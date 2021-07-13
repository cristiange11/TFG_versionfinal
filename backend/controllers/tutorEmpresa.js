const { validationResult } = require('express-validator');

const TutorEmpresa = require('../models/tutorEmpresa');
const bcrypt = require('bcryptjs');
exports.getTutores = async (req, res, next) => {
    try {
        const tutores = await TutorEmpresa.getTutores();

        res.status(200).json({ tutores: tutores });

    } catch (err) {
        res.status(500).json({ error: err });

    }

};
exports.getTutor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const tutor = await TutorEmpresa.getTutor(dni);
        res.status(200).json({ tutor: tutor });

    } catch (err) {
        res.status(500).json({ error: err });

    }

};
exports.deleteTutor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const tutor = await TutorEmpresa.deleteTutor(dni);
        res.status(200).json({ message: "success" });

    } catch (err) {
        res.status(500).json({ error: err });

    }

};
exports.updateTutor = async (req, res, next) => {
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
            
            const result = TutorEmpresa.updateTutor(req.body).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ message: "sucess" });W
            }).catch(function () {
                console.log("Promise Rejected");
            });


        } catch (err) {
            res.status(500).json({ error: err });
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
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const result = TutorEmpresa.createTutor(req.body, hashedPassword).then(function (result) {
                console.log("Promise Resolved");

                res.status(201).json({ message: "success" });
            }).catch(function () {
                console.log("Promise Rejected");
            });


        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};