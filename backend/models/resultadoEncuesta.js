const promisePool = require('../util/database');

module.exports = class ResultadoEncuesta {
    constructor(id, codigoResultado, nombreResultado) {
        this.id = id;
        this.codigoResultado = codigoResultado;
        this.nombreResultado = nombreResultado;
    }
    static async getResultados() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM resultado_encuesta`);
        await connection.end();
        return rows;
    }
    static async getResultado(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM resultado_encuesta WHERE id = ${connection.escape(id)}`);
        await connection.end();
        return rows;
    }


};