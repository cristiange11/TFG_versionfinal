const promisePool = require('../util/database');

module.exports = class Profesor {
    constructor(dni, departamento) {
        this.dni = dni;
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
    static async getProfesor(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM profesor WHERE dni='${dni}'`
        );
        return rows;
    }
    
    static async deleteProfesor(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM profesor WHERE dni = '${dni}' `);
        return rows;
    }
    static async createProfesor(profesor) {
        console.log(`INSERT INTO profesor(dni, departamento) VALUES 
        ('${profesor.dni}','${profesor.departamento}') `)
        const [rows, fields] = await promisePool.query(
            `INSERT INTO profesor(dni, departamento) VALUES 
            ('${profesor.dni}','${profesor.departamento}') `);
        return rows;
    }
    static async updateProfesor(profesor) {
        const [rows, fields] = await promisePool.query(
            `UPDATE profesor SET departamento='${profesor.departamento}'WHERE dni = '${profesor.dni}'
             `);
        return rows;
    }
};