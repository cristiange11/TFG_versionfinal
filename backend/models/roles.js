const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(id,codigo_rol,nombre_rol) {
        this.id= id;
        this.codigo_rol=codigo_rol;
        this.nombre_rol=nombre_rol;
    }
    static async getRoles() { 
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM rol`);
        return rows;
    }
    static async getRol(id) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM rol WHERE id = ${id}`);
        return rows;
    }


};