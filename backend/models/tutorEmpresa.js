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
    static async deleteTutor(dni,user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query =  `DELETE FROM tutor_empresa WHERE dni = '${dni}' `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado tutor empresa con DNI ${dni} ','${user}',sysdate(), 'tutor de empresa')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_TUTOR','No se ha borrado tutor empresa con DNI ${dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async createTutor(tutorEmpresa, password, user) {
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
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido tutor empresa con DNI ${tutorEmpresa.dni} ','${user}',sysdate(), 'tutor de empresa')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_TUTOR','No se ha añadido tutor empresa con DNI ${tutorEmpresa.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateTutor(tutor,user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query =  `UPDATE tutor_empresa SET moduloEmpresa='${tutor.moduloEmpresa}' and cifEmpresa = '${tutor.cifEmpresa}' WHERE dni = '${tutor.dni}'`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado tutor empresa con DNI ${tutor.dni} ','${user}',sysdate(), 'tutor de empresa')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_TUTOR','No se ha actualizado tutor empresa con DNI ${tutor.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    
};