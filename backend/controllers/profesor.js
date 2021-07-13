const { validationResult } = require('express-validator');

const Profesor = require('../models/profesor');
const bcrypt = require('bcryptjs');
exports.getProfesores = async (req, res, next) => {
    try {
        const profesores = await Profesor.getProfesores();

        res.status(200).json({ profesores: profesores });

    } catch (err) {
        res.status(500).json({ error: err });
    }

};
exports.getProfesor = async (req, res, next) => {
    const dni = req.params.dni;
    try {
        const profesor = await Profesor.getAlumno(dni);
        res.status(200).json({ profesor: profesor });

    } catch (err) {
        res.status(500).json({ error: err });
    }

};
exports.deleteProfesor = async (req, res, next) => {
   
    const dni = req.params.dni;
 
    try {
        const profesor = await Profesor.deleteProfesor(dni);
        res.status(200).json({ profesor: "sucess" });

    } catch (err) {
        res.status(500).json({ error: err });
    }

};
exports.updateProfesor = async (req, res, next) => {
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
            
            const result = Profesor.updateProfesor(req.body).then(function (result) {
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
};
exports.createProfesor = async (req, res, next) => {
    
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
            const result = Profesor.createProfesor(req.body, hashedPassword).then(function (result) {
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
};