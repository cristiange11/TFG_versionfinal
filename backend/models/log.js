const promisePool = require('../util/database');

module.exports = class LogSesion {
    constructor(usuario, fechaHoraLog, error) {
        this.usuario = usuario;
        this.fechaHoraLog = fechaHoraLog;
        this.error = error;

    }
    static async getLogs() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM logs `);
        await connection.end();
        return rows;
    }
    static async createLog(equals, dni) {
        const connection = await promisePool.connection();
        if (!equals) {
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_LOGIN','Credenciales incorrectas ' ,${connection.escape(dni)},sysdate(), 'login')`);
        }
        else {
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha logado usuario ' ,${connection.escape(dni)},sysdate(), 'login')`);
        }
        await connection.end();

    }

};