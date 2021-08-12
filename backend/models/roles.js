const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(id, codigoRol, nombreRol) {
        this.id = id;
        this.codigoRol = codigoRol;
        this.nombreRol = nombreRol;
    }
    static async getRoles() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM rol`);
        await connection.end();
        return rows;
    }
    static async getRol(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM rol WHERE id = ${connection.escape(id)}`);
        await connection.end();
        return rows;
    }


};