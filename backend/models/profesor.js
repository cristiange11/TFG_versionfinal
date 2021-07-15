const promisePool = require('../util/database');
const User = require('./user');
module.exports = class Profesor extends User {
    constructor(json) {
        super(json);
        this.departamento = departamento;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM profesor where dni = '${dni}'`);
    }
    static async getProfesores() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM profesor `);
        return rows;
    }

    static async deleteProfesor(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM profesor WHERE dni = '${dni}' `);
        return rows;
    }
    static async createProfesor(profesor, password) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${profesor.dni}','${profesor.nombre}',
                '${profesor.apellidos}','${profesor.correo}','${profesor.movil}','${profesor.direccion}','${password}',
                '${profesor.genero}',${profesor.cp},'${profesor.rol}',STR_TO_DATE('${profesor.fechaNacimiento}','%d/%m/%Y'),
                '${profesor.fpDual}','${profesor.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO profesor(dni, departamento) VALUES 
            ('${profesor.dni}','${profesor.departamento}')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateProfesor(profesor) {
        const [rows, fields] = await promisePool.query(
            `UPDATE profesor SET departamento='${profesor.departamento}'WHERE dni = '${profesor.dni}'
             `);
        return rows;
    }
};