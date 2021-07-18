const promisePool = require('../util/database');

module.exports = class TutorEmpresa {
    constructor(dni, moduloEmpresa, cifEmpresa) {
        this.dni = dni;
        this.moduloEmpresa = moduloEmpresa;
        this.cifEmpresa = cifEmpresa;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM tutor_empresa where dni = '${dni}'`);
    }
    static async getTutores() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM tutor_empresa `);
        return rows;
    }
    static async deleteTutor(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM tutor_empresa WHERE dni = '${dni}' `);
        return rows;
    }
    static async createTutor(tutorEmpresa, password) {
        const connection = await promisePool.getConnection();
       
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fechaNacimiento, fpDual, codigoCentro) VALUES ('${tutorEmpresa.dni}','${tutorEmpresa.nombre}',
                '${tutorEmpresa.apellidos}','${tutorEmpresa.correo}','${tutorEmpresa.movil}','${tutorEmpresa.direccion}','${password}',
                '${tutorEmpresa.genero}',${tutorEmpresa.cp},'${tutorEmpresa.rol}',STR_TO_DATE('${tutorEmpresa.fechaNacimiento}','%Y-%m-%d'),
                '${tutorEmpresa.fpDual}','${tutorEmpresa.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO tutor_empresa (dni, moduloEmpresa, cifEmpresa) VALUES 
            ('${tutorEmpresa.dni}','${tutorEmpresa.moduloEmpresa}', '${tutorEmpresa.cifEmpresa}')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateTutor(tutor) {
        const [rows, fields] = await promisePool.query(
            `UPDATE tutor_empresa SET moduloEmpresa='${tutor.moduloEmpresa}' and cifEmpresa = '${tutor.cifEmpresa}' WHERE dni = '${profesor.dni}'
             `);
        return rows;
    }
    static async updateTutor(tutorEmpresa) {
        
        const [rows, fields] = await promisePool.query(
            `UPDATE tutor_empresa SET moduloEmpresa='${tsutorEmpresa.moduloEmpresa}'
             WHERE dni = '${tutorEmpresa.dni}'
             `);
        return rows;
    }
};