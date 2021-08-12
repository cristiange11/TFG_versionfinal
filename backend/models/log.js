const promisePool = require('../util/database');

module.exports = class LogSesion {
    constructor(usuario, fechaHoraLog, error) {
        this.usuario = usuario;
        this.fechaHoraLog = fechaHoraLog;
        this.error = error;

    }
    static async getLogs() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM logs `);
            await connection.end();
        return rows;
    }

};