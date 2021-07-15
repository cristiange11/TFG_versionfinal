const promisePool = require('../util/database');

module.exports = class User {
    constructor(json) {
        this.dni = json.dni;
        this.nombre = json.nombre;
        this.apellidos = json.apellidos;
        this.correo = json.correo;
        this.movil = json.movil;
        this.direccion = json.direccion;
        this.password = json.password;
        this.genero = json.genero;
        this.cp = json.cp;
        this.rol = json.rol;
        this.fecha_nacimiento = json.fechaNacimiento;
        this.fp_dual = json.fpDual;
        this.codigo_centro = json.codigo_centro;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM usuario where dni = '${dni}'`);
    }

    static async findCorreo(correo,dni) {
        return await promisePool.query(
            `SELECT * FROM usuario where correo = '${correo}' AND dni!= '${dni}'`);
    }
    static async findMovil(movil,dni) {
        return await promisePool.query(
            `SELECT * FROM usuario where movil = '${movil}' AND dni!= '${dni}'`);
    }
    static async save(user) {

        const [rows, fields] = await promisePool.query(
            `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${user.dni}','${user.nombre}','${user.apellidos}','${user.correo}','${user.movil}','${user.direccion}','${user.password}','${user.genero}',${user.cp},'${user.rol}',STR_TO_DATE('${user.fechaNacimiento}','%d/%m/%Y'),'${user.fpDual}','${user.codigoCentro}')`
        );
        return rows;
    }
    static async findCorreo(correo) {
        return await promisePool.query(
            `SELECT * FROM usuario where correo = '${correo}'`);
    }
    static async updateUser(user) {
        return await promisePool.query(
            `UPDATE usuario SET nombre='${user.nombre}',apellidos='${user.apellidos}',correo='${user.correo}',
            movil='${user.movil}',direccion='${user.direccion}',password='${user.password}',genero='${user.genero}',
            cp='${user.cp}',rol='[value-10]',fecha_nacimiento=STR_TO_DATE('${user.fechaNacimiento}',fp_dual='${user.fpDual}'
            ,codigo_centro='${user.codigoCentro}' WHERE dni= ${user.dni}`);
    }
    static async getUsers() {
        return await promisePool.query(
            `SELECT * FROM usuario `);
    }
};