const promisePool = require('../util/database');

module.exports = class ResultadoEncuesta {
    constructor(id, codigoResultado, nombreResultado) {
        this.id = id;
        this.codigoResultado = codigoResultado;
        this.nombreResultado = nombreResultado;
    }
    //Método utilizado para obtener un listado de los resultados de encuesta
    static async getResultados() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM resultado_encuesta`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener la información de un resultado de encuesta
    static async getResultado(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM resultado_encuesta WHERE id = ${connection.escape(id)}`);
        await connection.end();
        return rows;
    }


};