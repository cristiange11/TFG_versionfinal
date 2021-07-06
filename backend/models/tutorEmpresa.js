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
        const [rows, fields] = await promisePool.query(
            `INSERT INTO tutor_empresa(dni, modulo_empresa, cif_empresa) VALUES 
            ('${tutor_empresa.dni}','${tutor_empresa.modulo_empresa}','${tutor_empresa.cif_empresa}') `);
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