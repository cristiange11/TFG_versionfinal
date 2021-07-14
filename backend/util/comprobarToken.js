const jwt_decode = require('jwt-decode');

exports.compruebaToken = function (token) {
    console.log("entro a la funcion")
    var expirado=false;
    jwtDecoded = token;
    let expiresIn = jwtDecoded["exp"];
    console.log("Expirado en " + expiresIn);
    let currentTime = Math.trunc(new Date().getTime()/1000)
    if (currentTime >= expiresIn) {
        expirado=true;
    }
    console.log("entro y compruebo si esta expriado" + expirado)
    return expirado;
}
