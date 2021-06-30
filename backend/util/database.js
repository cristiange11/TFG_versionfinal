const mysql = require('mysql2');
const config = require('../config/config.json');

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'tfg',
    password: ''
});

module.exports = pool.promise();