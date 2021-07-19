const promisePool = require('../util/database');

module.exports = class Centro {
    constructor(codigoCentro, correo, telefono, provincia, nombre, cp, direccion) {
        this.codigoCentro = codigoCentro;
        this.correo = correo;
        this.telefono = telefono;
        this.provincia = provincia;
        this.nombre = nombre;
        this.cp = cp;
        this.direccion = direccion;
    }
    static async find(codigoCentro) {

        return await promisePool.query(
            `SELECT * FROM centro_educativo where codigoCentro = '${codigoCentro}'`);
    }
    static async findCorreo(correo, codigoCentro) {
        return await promisePool.query(
            `SELECT * FROM centro_educativo where correo = '${correo}' AND codigoCentro != '${codigoCentro}'`);
    }
    static async findTelefono(telefono, codigoCentro) {
        console.log(`SELECT * FROM centro_educativo where telefono = '${telefono}'  AND codigoCentro != '${codigoCentro}'`)
        return await promisePool.query(
            `SELECT * FROM centro_educativo where telefono = '${telefono}'  AND codigoCentro != '${codigoCentro}'`);
    }

    static async getCentros() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM centro_educativo WHERE nombre != '' `
        );
        return rows;
    }

    static async deleteCentro(codigoCentro) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM centro_educativo WHERE codigoCentro = '${codigoCentro}' `);
        return rows;
    }
    static async createCentro(centro, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO centro_educativo (codigoCentro, correo, telefono, provincia, nombre, CP, direccion) VALUES ('${centro.codigoCentro}','${centro.correo}','${centro.telefono}','${centro.provincia}','${centro.nombre}','${centro.CP}','${centro.direccion}') `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido centro con codigo ${centro.codigoCentro} ','${user}',sysdate(), 'centro educativo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_CENTRO','No se ha añadido el centro con codigo centro ${centro.codigoCentro}','${user}',sysdate(), 'centro educativo')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
       
    }
    static async updateCentro(centro) {

        const [rows, fields] = await promisePool.query(
            `UPDATE centro_educativo SET correo='${centro.correo}',telefono='${centro.telefono}',provincia='${centro.provincia}',
            nombre='${centro.nombre}',CP='${centro.CP}',direccion='${centro.direccion}' WHERE codigoCentro = '${centro.codigoCentro}'
             `);
        return rows;
    }
    static async deleteUserAndFPByCentro(codigoCentro, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario WHERE codigoCentro =  '${codigoCentro}'`;
            await connection.query(query)
            await connection.query(`DELETE FROM fp_duales WHERE codigoCentro = '${codigoCentro}'`);
            await connection.query(`DELETE FROM centro_educativo WHERE codigoCentro =  '${codigoCentro}'`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado todo lo asociado al centro ' ,'${user}',sysdate(), 'centro educativo')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_CENTRO','No se ha podido eliminar el centro ' ,'${user}',sysdate(), 'centro educativo')`);            

            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
};