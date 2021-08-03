const promisePool = require('../util/database');

module.exports = class ResultadoEncuesta {
    constructor(id, codigoResultado, nombreResultado) {
        this.id = id;
        this.codigoResultado = codigoResultado;
        this.nombreResultado = nombreResultado;
    }
    static async getResultados() {
        const [rows, fields] = await promisePool.query(`SELECT * FROM resultado_encuesta`);
        return rows;
    }
    static async getResultado(id) {
        const [rows, fields] = await promisePool.query(`SELECT * FROM resultado_encuesta WHERE id = ${id}`);
        return rows;
    }


};