const mysql = require('mysql2');
const config = require('../config/config.json');

exports.connection = function (){
    const pool =  mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'tfg',
        password: ''
    });
    return pool.promise();
}