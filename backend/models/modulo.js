const promisePool = require('../util/database');

module.exports = class Modulo {
    constructor(codigo, nombre, descripcion, curso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }
    
    static async getModulos(fpDual) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM modulo where fpDual = ${fpDual}`);
        return rows;
    }
    static async deleteModulo(codigo, user) {
        const connection = await promisePool.getConnection();
        
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM modulo WHERE codigo =  ${codigo}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado el módulo ${id}' ,'${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_MODULO','No se ha podido eliminar el módulo ' ,'${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
       
    }
    static async deleteAllBymodulo(codigo,user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario U , alumno A, alumno_modulo AM, `;
            await connection.query(query);
            await connection.query(`DELETE FROM modulo WHERE codigo =  '${codigo}'`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado todo lo asociado a la modulo ' ,'${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_modulo','No se ha podido eliminar la modulo ' ,'${user}',sysdate(), 'modulo')`);            

            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async createModulo(modulo, user) {
        const connection = await promisePool.getConnection();
        console.log(`INSERT INTO modulo(nombre, descripcion, curso, fpDual) VALUES ('${modulo.nombre}','${modulo.descripcion}','${modulo.curso}', ${modulo.fpDual}) `)
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO modulo(nombre, descripcion, curso, fpDual) VALUES ('${modulo.nombre}','${modulo.descripcion}','${modulo.curso}', ${modulo.fpDual}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha creado el modulo con id ${modulo.id} ','${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_MODULO','No se ha añadido modulo con id ${modulo.id}','${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async updateModulo(modulo, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE modulo SET nombre='${modulo.nombre}', descripcion='${modulo.descripcion}',curso='${modulo.curso}', fpDual = ${modulo.fpDual} WHERE codigo = '${modulo.codigo}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado el modulo con id ${modulo.id} ','${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_modulo','No se ha actualizado el modulo con id ${modulo.id}','${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
};