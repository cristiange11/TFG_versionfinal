const promisePool = require('../util/database');

module.exports = class Modulo {
    constructor(codigo, nombre, descripcion, curso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }
    
    static async find(codigo) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM modulo where codigo = ${codigo}`);
        return rows;
    }
    static async getModulos(fpDual) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM modulo where fpDual = ${fpDual}`);
        return rows;
    }
    static async getModulosProf(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT M.* FROM modulo M, profesor_modulo PM, profesor P WHERE P.dni = PM.dni AND PM.codigoModulo = M.codigo AND P.dni = "${dni}"`);
        return rows;
    }
    static async getModulosTut(dni) {        
        const [rows, fields] = await promisePool.query(
            `SELECT M.* FROM modulo M, tutor_modulo TM, tutor_empresa T WHERE T.dni = TM.dni AND TM.codigoModulo = M.codigo AND T.dni = "${dni}"`);
        return rows;
    }
    static async getModulosAlum(dni) { 
        console.log(`SELECT U.*, M.nombre as nombreModulo, A.numeroExpediente FROM alumno as A, usuario as U, modulo as M,calificacion as C where U.rol=5 AND U.dni='${dni}' AND A.dni = U.dni AND (not EXISTS(SELECT * from calificacion as E where E.codigoModulo = M.codigo ) OR (C.dni = U.dni AND C.nota<5))`)
        const [rows, fields] = await promisePool.query(`SELECT U.*, M.nombre as nombreModulo, M.codigo as codigoModulo, A.numeroExpediente FROM alumno as A, usuario as U, modulo as M,calificacion as C where U.rol=5 AND U.dni='${dni}' AND A.dni = U.dni AND (not EXISTS(SELECT * from calificacion as E where E.codigoModulo = M.codigo ) OR (C.dni = U.dni AND C.nota<5))`);
        return rows;
    }
    
    static async deleteModulo(codigo, user) {
        const connection = await promisePool.getConnection();
        
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM modulo WHERE codigo =  ${codigo}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado el módulo ${codigo}' ,'${user}',sysdate(), 'modulo')`);            
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
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha creado el modulo con id ${modulo.codigo} ','${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_MODULO','No se ha añadido modulo con id ${modulo.codigo}','${user}',sysdate(), 'modulo')`);            
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
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_MODULO','No se ha actualizado el modulo con id ${modulo.id}','${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
};