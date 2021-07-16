const promisePool = require('../util/database');

module.exports = class Empresa {
    constructor(cifEmpresaEmpresa, direccion, nombre, tipo, correo, telefono, url) {
        this.cifEmpresaEmpresa = cifEmpresaEmpresa;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.correo = correo;
        this.telefono = telefono;
        this.url = url;
    }
    static async findTelefono(telefono) {
        return await promisePool.query(
            `SELECT * FROM empresa where telefono = '${telefono}'`);
    }
    static async find(cifEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where cifEmpresa = '${cifEmpresa}'`);
    }
    static async getEmpresas() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM empresa `);
        return rows;
    }
    static async deleteEmpresa(cifEmpresa) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM empresa WHERE cifEmpresa = '${cifEmpresa}' `);
        return rows;
    }
    static async createEmpresa(empresa) {
        
        const [rows, fields] = await promisePool.query(
            `INSERT INTO empresa(cifEmpresa, direccion, nombre, correo, telefono, url) VALUES 
            ('${empresa.cifEmpresa}','${empresa.direccion}','${empresa.nombre}','${empresa.correo}','${empresa.telefono}','${empresa.url}') `);
        return rows;
    }
    static async updateEmpresa(empresa) {
        const [rows, fields] = await promisePool.query(
            `UPDATE empresa SET direccion='${empresa.direccion}',nombre='${empresa.nombre}',tipo='${empresa.tipo}',
            correo='${empresa.correo}',telefono='${empresa.telefono}',url='${empresa.url}' WHERE cifEmpresa = '${empresa.cifEmpresa}'
             `);
        return rows;
    }
};