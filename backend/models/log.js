const promisePool = require('../util/database');

module.exports = class LogSesion {
    constructor(usuario, fechaHoraLog, error) {
        this.usuario = usuario;
        this.fechaHoraLog = fechaHoraLog;
        this.error = error;

    }
    static async getLogs() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM logs `);
        return rows;
    }

};