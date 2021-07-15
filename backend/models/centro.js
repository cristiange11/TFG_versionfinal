const promisePool = require('../util/database');

module.exports = class Centro {
    constructor(codigoCentro, correo, telefono, provincia, nombre, cp, direccion) {
        this.codigoCentro = codigoCentro;
        this.correo = correo;
        this.telefono = telefono;
        this.provincia = provincia;
        this.nombre = nombre;
        this.cp = cp;
        this.direccion = direccion;
    }
    static async find(codigoCentro) {

        return await promisePool.query(
            `SELECT * FROM centroEducativo where codigoCentro = '${codigoCentro}'`);
    }
    static async findCorreo(correo, codigoCentro) {
        return await promisePool.query(
            `SELECT * FROM centroEducativo where correo = '${correo}' AND codigoCentro != '${codigoCentro}'`);
    }
    static async findTelefono(telefono, codigoCentro) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where telefono = '${telefono}' codigoCentro AND codigoCentro != '${codigoCentro}'`);
    }

    static async getCentros() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM centro_educativo WHERE nombre != '' `
        );
        return rows;
    }

    static async deleteCentro(codigoCentro) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM centro_educativo WHERE codigoCentro = '${codigoCentro}' `);
        return rows;
    }
    static async createCentro(centro) {
        const [rows, fields] = await promisePool.query(
            `INSERT INTO centro_educativo (codigoCentro, correo, telefono, provincia, nombre, CP, direccion) VALUES 
            ('${centro.codigoCentro}','${centro.correo}','${centro.telefono}','${centro.provincia}','${centro.nombre}','${centro.CP}','${centro.direccion}') `);
        return rows;
    }
    static async updateCentro(centro) {

        const [rows, fields] = await promisePool.query(
            `UPDATE centro_educativo SET correo='${centro.correo}',telefono='${centro.telefono}',provincia='${centro.provincia}',
            nombre='${centro.nombre}',CP='${centro.CP}',direccion='${centro.direccion}' WHERE codigoCentro = '${centro.codigoCentro}'
             `);
        return rows;
    }
};