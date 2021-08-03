const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(id, codigoRol, nombreRol) {
        this.id = id;
        this.codigoRol = codigoRol;
        this.nombreRol = nombreRol;
    }
    static async getRoles() {
        const [rows, fields] = await promisePool.query(`SELECT * FROM rol`);
        return rows;
    }
    static async getRol(id) {
        const [rows, fields] = await promisePool.query(`SELECT * FROM rol WHERE id = ${id}`);
        return rows;
    }


};