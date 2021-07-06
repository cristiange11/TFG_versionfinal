const promisePool = require('../util/database');

module.exports = class Alumno {
    constructor(dni, numero_expediente) {
        this.dni = dni;
        this.numero_expediente = numero_expediente;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM alumno where dni = '${dni}'`);
    }
    static async findExpediente(numero_expediente) {
        return await promisePool.query(
            `SELECT * FROM alumno where numero_expediente = '${numero_expediente}'`);
    }
    static async getAlumnos() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM alumno `);
        return rows;
    }
    static async getAlumno(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM alumno WHERE dni='${dni}'`
        );
        return rows;
    }
    
    static async deleteAlumno(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM alumno WHERE dni = '${dni}' `);
        return rows;
    }
    static async createAlumno(alumno) {
        const [rows, fields] = await promisePool.query(
            `INSERT INTO alumno(dni, numero_expediente) VALUES 
            ('${alumno.dni}','${alumno.numero_expediente}') `);
        return rows;
    }/*
    static async updateAlumno(alumno) {
        const [rows, fields] = await promisePool.query(
            `UPDATE alumno SET numero_expediente='${alumno.numero_expediente}'WHERE dni = '${alumno.dni}'
             `);
        return rows;
    }*/
};