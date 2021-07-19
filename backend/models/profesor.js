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

    static async deleteProfesor(dni,user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query =  `DELETE FROM profesor WHERE dni = '${dni}' `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado profesor con DNI ${dni} ','${user}',sysdate(), 'profesor')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR','No se ha borrado profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async createProfesor(profesor, password, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fechaNacimiento, fpDual, codigoCentro) VALUES ('${profesor.dni}','${profesor.nombre}',
                '${profesor.apellidos}','${profesor.correo}','${profesor.movil}','${profesor.direccion}','${password}',
                '${profesor.genero}',${profesor.cp},'${profesor.rol}',STR_TO_DATE('${profesor.fechaNacimiento}','%Y-%m-%d'),
                '${profesor.fpDual}','${profesor.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO profesor(dni, departamento) VALUES 
            ('${profesor.dni}','${profesor.departamento}')`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_PROFESOR','No se ha añadido profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateProfesor(profesor,user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query =  `UPDATE profesor SET departamento='${profesor.departamento}'WHERE dni = '${profesor.dni}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado profesor con DNI ${dni} ','${user}',sysdate(), 'profesor')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR','No se ha actualizado profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
};