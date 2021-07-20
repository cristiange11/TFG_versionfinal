const promisePool = require('../util/database');

module.exports = class Modulo {
    constructor(codigo, nombre, descripcion, curso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }
    
    static async getModulos() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM modulo `);
        return rows;
    }
    static async deleteModulo(id, user) {
        const connection = await promisePool.getConnection();
        
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM modulo WHERE id =  '${id}'`;
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
    static async deleteTutormoduloBymodulo(id,user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario U , tutor_modulo T where U.dni = T.dni AND T.id ='${id}'`;
            await connection.query(query);
            await connection.query(`DELETE FROM tutor_modulo WHERE id = '${id}'`);
            await connection.query(`DELETE FROM modulo WHERE id =  '${id}'`);
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
    static async createmodulo(modulo, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO modulo(id, direccion, nombre, correo, telefono, url) VALUES ('${modulo.id}','${modulo.direccion}','${modulo.nombre}','${modulo.correo}','${modulo.telefono}','${modulo.url}') `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido modulo con CIF ${modulo.id} ','${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_modulo','No se ha añadido modulo con CIF ${modulo.id}','${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async updatemodulo(modulo, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE modulo SET direccion='${modulo.direccion}',nombre='${modulo.nombre}', correo='${modulo.correo}',telefono='${modulo.telefono}',url='${modulo.url}' WHERE id = '${modulo.id}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado modulo con CIF ${modulo.id} ','${user}',sysdate(), 'modulo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_modulo','No se ha actualizado modulo con CIF ${modulo.id}','${user}',sysdate(), 'modulo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
};