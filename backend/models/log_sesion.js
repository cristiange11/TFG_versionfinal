const promisePool = require('../util/database');

module.exports = class LogSesion {
    constructor(usuario, fechaHoraLog, error) {
        this.usuario = usuario;
        this.fechaHoraLog = fechaHoraLog;
        this.error = error;
       
    }
    static async getInicioSesiones() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM log_login `);
        return rows;
    }
    static async createInicioSesion(user, error,fechaHora){
        console.log(`INSERT INTO log_login (usuario, fechaHoraLog, error) VALUES 
        ('${user}',${fechaHora},${error}) `)
        const [rows, fields] = await promisePool.query(
            `INSERT INTO log_login (usuario, fechaHoraLog, error) VALUES 
            ('${user}','${fechaHora}',${error}) `);
        return rows;
    }
};