const promisePool = require('../util/database');
const User = require('./user');

module.exports = class Alumno extends User {
    constructor(json) {
        super(json);
        this.numero_expediente = numero_expediente;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM alumno where dni = '${dni}'`);
    }
    static async findExpediente(numeroExpediente) {
        return await promisePool.query(
            `SELECT * FROM alumno where numero_expediente = '${numeroExpediente}'`);
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
    static async  createAlumno(alumno, password) {
        console.log("addUserDetails, creating connection...");
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${alumno.dni}','${alumno.nombre}',
                '${alumno.apellidos}','${alumno.correo}','${alumno.movil}','${alumno.direccion}','${password}',
                '${alumno.genero}',${alumno.cp},'${alumno.rol}',STR_TO_DATE('${alumno.fechaNacimiento}','%d/%m/%Y'),
                '${alumno.fp_dual}','${alumno.codigo_centro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO alumno(dni, numero_expediente) VALUES 
            ('${alumno.dni}','${alumno.numero_expediente}')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
};