
exports.compruebaToken = function (token) {
    var expirado=false;
    var jwtDecoded = token;
    
    let expiresIn = jwtDecoded["exp"];
    let currentTime = Math.trunc(new Date().getTime()/1000)
    if (currentTime >= expiresIn) {
        expirado=true;
    }
    return expirado;
}
