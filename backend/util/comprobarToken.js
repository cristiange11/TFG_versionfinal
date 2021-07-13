const jwt_decode = require('jwt-decode');

exports.compruebaToken = function (token) {
    var expirado=false;
    jwtDecoded = token;
    let expiresIn = jwtDecoded["exp"];
    
    let currentTime = Math.trunc(new Date().getTime()/1000)
    if (currentTime >= expiresIn) {
        expirado=true;
    }
    console.log(expirado)
    return expirado;
}
