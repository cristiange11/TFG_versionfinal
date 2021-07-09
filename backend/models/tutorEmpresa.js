const promisePool = require('../util/database');

module.exports = class TutorEmpresa {
    constructor(dni, modulo_empresa, cif_empresa) {
        this.dni = dni;
        this.modulo_empresa = modulo_empresa;
        this.cif_empresa = cif_empresa;
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
    static async getTutor(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM tutor_empresa WHERE dni='${dni}'`
        );
        return rows;
    }
    
    static async deleteTutor(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM tutor_empresa WHERE dni = '${dni}' `);
        return rows;
    }
    static async createTutor(tutor_empresa) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fecha_nacimiento, fp_dual, codigo_centro) VALUES ('${tutor_empresa.dni}','${tutor_empresa.nombre}',
                '${tutor_empresa.apellidos}','${tutor_empresa.correo}','${tutor_empresa.movil}','${tutor_empresa.direccion}','${tutor_empresa.password}',
                '${tutor_empresa.genero}',${tutor_empresa.cp},'${tutor_empresa.rol}',STR_TO_DATE('${tutor_empresa.fecha_nacimiento}','%d/%m/%Y'),
                '${tutor_empresa.fp_dual}','${tutor_empresa.codigo_centro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO tutor_empresa(dni, modulo_empresa, cif_empresa) VALUES 
            ('${tutor_empresa.dni}','${tutor_empresa.modulo_empresa}', '${tutor_empresa.cif_empresa}')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
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
    static async updateTutor(tutor_empresa) {
        
        const [rows, fields] = await promisePool.query(
            `UPDATE tutor_empresa SET modulo_empresa='${tutor_empresa.modulo_empresa}'
             WHERE dni = '${tutor_empresa.dni}'
             `);
        return rows;
    }
};