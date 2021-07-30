const { validationResult } = require('express-validator');
const jwt_decode = require('jwt-decode');
const comprobarToken = require('../util/comprobarToken');
const Calificacion = require('../models/calificion');

exports.getCalificaciones = async (req, res, next) => {
    console.log(req.headers)
    if (req.headers['content-type'] != "application/json" || req.headers['x-frame-options'] != "deny") {
        res.status(406).json({ "errors": "No aceptable" });
    }
    else {
        var expirado = comprobarToken.compruebaToken(jwt_decode(req.headers['authorization']));
        console.log(expirado)
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
                console.log("codigo centro => " + req.params.codigoCentro)
                const user = jwt_decode(req.headers['authorization']).sub;
                await Calificacion.deleteCalificacion(req.params.id, user);
                res.status(201).json({ message: "success" });
            } catch (err) {
                res.status(409).json({ error: err });
            }
        }
    }
};
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
                    console.log("entro a updatear")
                    const user = jwt_decode(req.headers['authorization']).sub;
                    Calificacion.updateCalificacion(req.body, user).then(function (result) {
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
            console.log(errors)
            if (!errors.isEmpty()) {
                res.status(409).json({ "errors": resJSON });
            }
            else {
                try {
                    const user = jwt_decode(req.headers['authorization']).sub;
                    Calificacion.createCalificacion(req.body, user).then(function (){
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