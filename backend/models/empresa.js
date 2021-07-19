const promisePool = require('../util/database');

module.exports = class Empresa {
    constructor(cifEmpresaEmpresa, direccion, nombre, tipo, correo, telefono, url) {
        this.cifEmpresaEmpresa = cifEmpresaEmpresa;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.correo = correo;
        this.telefono = telefono;
        this.url = url;
    }
    static async findTelefono(telefono, cifEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where telefono = '${telefono}' AND cifEmpresa != '${cifEmpresa}'`);
    }
    static async findCorreo(correo, cifEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where correo = '${correo}' AND cifEmpresa != '${cifEmpresa}'`);
    }
    static async find(cifEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where cifEmpresa = '${cifEmpresa}'`);
    }
    static async getEmpresas() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM empresa `);
        return rows;
    }
    static async deleteEmpresa(cifEmpresa) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM empresa WHERE cifEmpresa =  '${cifEmpresa}'`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado  la empresa ' ,'${user}',sysdate(), 'empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA','No se ha podido eliminar la empresa ' ,'${user}',sysdate(), 'empresa')`);            

            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
        return await promisePool.query(
            `DELETE FROM empresa WHERE cifEmpresa =  '${cifEmpresa}'`);
        return rows;
    }
    static async deleteTutorEmpresaByEmpresa(cifEmpresa,user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario U , tutor_empresa T where U.dni = T.dni AND T.cifEmpresa ='${cifEmpresa}'`;
            await connection.query(query);
            await connection.query(`DELETE FROM tutor_empresa WHERE cifEmpresa = '${cifEmpresa}'`);
            await connection.query(`DELETE FROM empresa WHERE cifEmpresa =  '${cifEmpresa}'`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado todo lo asociado a la empresa ' ,'${user}',sysdate(), 'empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA','No se ha podido eliminar la empresa ' ,'${user}',sysdate(), 'empresa')`);            

            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async createEmpresa(empresa, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO empresa(cifEmpresa, direccion, nombre, correo, telefono, url) VALUES ('${empresa.cifEmpresa}','${empresa.direccion}','${empresa.nombre}','${empresa.correo}','${empresa.telefono}','${empresa.url}') `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido empresa con CIF ${empresa.cifEmpresa} ','${user}',sysdate(), 'empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_EMPRESA','No se ha añadido empresa con CIF ${empresa.cifEmpresa}','${user}',sysdate(), 'empresa')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async updateEmpresa(empresa, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE empresa SET direccion='${empresa.direccion}',nombre='${empresa.nombre}', correo='${empresa.correo}',telefono='${empresa.telefono}',url='${empresa.url}' WHERE cifEmpresa = '${empresa.cifEmpresa}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado empresa con CIF ${empresa.cifEmpresa} ','${user}',sysdate(), 'empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_EMPRESA','No se ha actualizado empresa con CIF ${empresa.cifEmpresa}','${user}',sysdate(), 'empresa')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }
};