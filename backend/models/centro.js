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
    static async findCorreo(correo, codigo_centro) {
        console.log(codigo_centro)
        return await promisePool.query(
            `SELECT * FROM centro_educativo where correo = '${correo}' AND codigo_centro != '${codigo_centro}'`);
    }
    static async findTelefono(telefono, codigo_centro) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where telefono = '${telefono}' codigo_centro AND codigo_centro != '${codigo_centro}'`);
    }

    static async getCentros() {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM centro_educativo"
        );
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
            ('${centro.codigo_centro}','${centro.correo}','${centro.telefono}','${centro.provincia}','${centro.nombre}','${centro.CP}','${centro.direccion}') `);
        return rows;
    }
    static async updateCentro(centro) {

        const [rows, fields] = await promisePool.query(
            `UPDATE centro_educativo SET correo='${centro.correo}',telefono='${centro.telefono}',provincia='${centro.provincia}',
            nombre='${centro.nombre}',CP='${centro.CP}',direccion='${centro.direccion}' WHERE codigo_centro = '${centro.codigo_centro}'
             `);
        return rows;
    }
};