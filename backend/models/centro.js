const promisePool = require('../util/database');

module.exports = class Centro {
    constructor(codigo_centro, correo, telefono, provincia, nombre, cp, direccion) {
        this.codigoCentro = codigo_centro;
        this.correo = correo;
        this.telefono = telefono;
        this.provincia = provincia;
        this.nombre = nombre;
        this.cp = cp;
        this.direccion = direccion;
    }
    static async find(codigoCentro) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where codigo_centro = '${codigoCentro}'`);
    }
    static async findCorreo(correo) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where correo = '${correo}'`);
    }
    static async findTelefono(telefono) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where telefono = '${telefono}'`);
    }
    static async getNombreCentros() {
        const [rows, fields] = await promisePool.query(
            `SELECT nombre FROM centro_educativo `);
        return rows;
    }
    static async getCentros() {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM centro_educativo"
        );
        return rows;
    }
    static async getCentro(codigoCentro) {

        const [rows, fields] = await promisePool.query(
            `SELECT * FROM centro_educativo where codigo_centro='${codigoCentro}' `);
        return rows;
    }
    static async deleteCentro(codigoCentro) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM centro_educativo WHERE codigo_centro = '${codigoCentro}' `);
        return rows;
    }
    static async createCentro(centro) {
        const [rows, fields] = await promisePool.query(
            `INSERT INTO centro_educativo(codigo_centro, correo, telefono, provincia, nombre, CP, direccion) VALUES 
            ('${centro.codigoCentro}','${centro.correo}','${centro.telefono}','${centro.provincia}','${centro.nombre}','${centro.cp}','${centro.direccion}') `);
        return rows;
    }
    static async updateCentro(centro) {
        const [rows, fields] = await promisePool.query(
            `UPDATE centro_educativo SET correo='${centro.correo}',telefono='${centro.telefono}',provincia='${centro.provincia}',
            nombre='${centro.nombre}',CP='${centro.cp}',direccion='${centro.direccion}' WHERE codigo_centro = '${centro.codigoCentro}'
             `);
        return rows;
    }
};