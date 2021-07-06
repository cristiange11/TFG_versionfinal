const promisePool = require('../util/database');

module.exports = class User {
    constructor(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fecha_nacimiento, fp_dual, codigo_centro) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.movil = movil;
        this.direccion = direccion;
        this.password = password;
        this.genero = genero;
        this.cp = cp;
        this.rol = rol;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fp_dual = fp_dual;
        this.codigo_centro = codigo_centro;
    }
    static async find(dni) {

        return await promisePool.query(
            `SELECT * FROM usuario where dni = '${dni}'`);
    }

    static async findCorreo(correo) {
        return await promisePool.query(
            `SELECT * FROM usuario where correo = '${correo}'`);
    }
    static async findMovil(movil) {
        return await promisePool.query(
            `SELECT * FROM usuario where movil = '${movil}'`);
    }
    static async save(user) {
        console.log(`INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${user.dni}','${user.nombre}','${user.apellidos}','${user.correo}','${user.movil}','${user.direccion}','${user.password}','${user.genero}',${user.cp},'${user.rol}',STR_TO_DATE('${user.fecha_nacimiento}','%d/%m/%Y'),'${user.fp_dual}','${user.codigo_centro}')`)
        const [rows, fields] = await promisePool.query(
            `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${user.dni}','${user.nombre}','${user.apellidos}','${user.correo}','${user.movil}','${user.direccion}','${user.password}','${user.genero}',${user.cp},'${user.rol}',STR_TO_DATE('${user.fecha_nacimiento}','%d/%m/%Y'),'${user.fp_dual}','${user.codigo_centro}')`
        );
        return rows;
    }
    static async findCorreo(correo) {
        return await promisePool.query(
            `SELECT * FROM usuario where correo = '${correo}'`);
    }
    static async getUsers() {
        return await promisePool.query(
            `SELECT * FROM usuario `);
    }
};