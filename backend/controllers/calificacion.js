const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Calificacion = require('../models/calificion');
//Método utilizado para obtener las calificaciones
exports.getCalificaciones = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const calificaciones = await Calificacion.getCalificaciones(req.params.codigoModulo);
                res.status(200).json({ calificaciones: calificaciones });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para eliminar la calificación
exports.deleteCalificacion = async (req, res, next) => {
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        if (expirado) {
            res.status(401).json({ "errors": "Sesión expirada" });
        } else {
            try {
                const user = jwt_decode(req.headers['authorization']).sub;
                await Calificacion.deleteCalificacion(req.params.id, user).then(function (result) {
                    res.status(201).json({ message: "success" });
                  }).catch(function (err) {
                      
                    res.status(409).json({ "errors" : "no se ha podido borrar la calificación" });
                  });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    }
};
//Método utilizado para actualizar la calificación
exports.updateCalificacion = async (req, res, next) => {
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
                    await Calificacion.updateCalificacion(req.body, user).then(function (result) {
                        res.status(201).json({ message: "sucess" });
                    }).catch(function () {
                        res.status(401).json({ "errors": "no se ha podido actualizar la calificación" });
                    });
                } catch (err) {

                    res.status(500).json({ error: err });
                }
            }
        }
    }
}
//Método utilizado para crear la calificación
exports.createCalifcacion = async (req, res, next) => {
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
                    await Calificacion.createCalificacion(req.body, user).then(function () {
                        res.status(201).json({ message: "success" });
                    }).catch(function () {
                        res.status(401).json({ message: "no se ha podido crear la calificación:" + err });
                    });
                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        }
    }
};