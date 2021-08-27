const mysql = require('mysql2');
const config = require('../config/config.json');

exports.connection = function () {
    const pool = mysql.createPool({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
        port: config.port
    });
    return pool.promise();
}