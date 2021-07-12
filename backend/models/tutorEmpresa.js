const promisePool = require('../util/database');

module.exports = class TutorEmpresa {
    constructor(dni, modulo_empresa, cif_empresa) {
        this.dni = dni;
        this.modulo_empresa = modulo_empresa;
        this.cif_empresa = cif_empresa;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM tutorEmpresa where dni = '${dni}'`);
    }
    static async getTutores() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM tutorEmpresa `);
        return rows;
    }
    static async getTutor(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM tutorEmpresa WHERE dni='${dni}'`
        );
        return rows;
    }
    
    static async deleteTutor(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM tutorEmpresa WHERE dni = '${dni}' `);
        return rows;
    }
    static async createTutor(tutorEmpresa, password) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${tutorEmpresa.dni}','${tutorEmpresa.nombre}',
                '${tutorEmpresa.apellidos}','${tutorEmpresa.correo}','${tutorEmpresa.movil}','${tutorEmpresa.direccion}','${password}',
                '${tutorEmpresa.genero}',${tutorEmpresa.cp},'${tutorEmpresa.rol}',STR_TO_DATE('${tutorEmpresa.fechaNacimiento}','%d/%m/%Y'),
                '${tutorEmpresa.fpDual}','${tutorEmpresa.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO tutor_empresa(dni, modulo_empresa, cif_empresa) VALUES 
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
            `UPDATE tutor_empresa SET modulo_empresa='${tutor.moduloEmpresa}' and cif_empresa = '${tutor.cifEmpresa}' WHERE dni = '${profesor.dni}'
             `);
        return rows;
    }
    static async updateTutor(tutorEmpresa) {
        
        const [rows, fields] = await promisePool.query(
            `UPDATE tutor_empresa SET modulo_empresa='${tsutorEmpresa.moduloEmpresa}'
             WHERE dni = '${tutorEmpresa.dni}'
             `);
        return rows;
    }
};