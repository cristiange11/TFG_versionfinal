const promisePool = require('../util/database');

module.exports = class Empresa {
    constructor(CIF, direccion, nombre, tipo, correo, telefono, url) {
        this.CIF = CIF;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.correo = correo;
        this.telefono = telefono;
        this.url = url;
    }
    static async find(CIF) {
        return await promisePool.query(
            `SELECT * FROM empresa where CIF = '${CIF}'`);
    }
    static async findTelefono(telefono) {
        return await promisePool.query(
            `SELECT * FROM empresa where telefono = '${telefono}'`);
    }
    static async getEmpresas() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM empresa `);
        return rows;
    }
    static async deleteEmpresa(CIF) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM empresa WHERE CIF = '${CIF}' `);
        return rows;
    }
    static async createEmpresa() {
        const [rows, fields] = await promisePool.query(
            `INSERT INTO empresa(CIF, direccion, nombre, tipo, correo, telefono, url) VALUES 
            ('${CIF}','${direccion}','${nombre}','${tipo}','${correo}','${telefono}','${url}') `);
        return rows;
    }
    static async updateEmpresa(empresa) {
        const [rows, fields] = await promisePool.query(
            `UPDATE empresa SET direccion='${empresa.direccion}',nombre='${empresa.nombre}',tipo='${empresa.tipo}',
            correo='${empresa.correo}',telefono='${empresa.telefono}',url='${empresa.url}' WHERE CIF = '${empresa.CIF}'
             `);
        return rows;
    }
};