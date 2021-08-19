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
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM centro_educativo where codigoCentro = ${connection.escape(codigoCentro)}`);
        await connection.end();
        return res;
    }
    static async findCorreo(correo, codigoCentro) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM centro_educativo where correo = ${connection.escape(correo)} AND codigoCentro != ${connection.escape(codigoCentro)}`);
        await connection.end();
        return res;
    }
    static async findTelefono(telefono, codigoCentro) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM centro_educativo where telefono = ${connection.escape(telefono)}  AND codigoCentro != ${connection.escape(codigoCentro)}`);
        await connection.end();
        return res;
    }
    static async findCorreoCreate(correo) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM centro_educativo where correo = ${connection.escape(correo)}`);
        await connection.end();
        return res;
    }
    static async findTelefonoCreate(telefono) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM centro_educativo where telefono = ${connection.escape(telefono)} `);
        await connection.end();
        return res;
    }
    static async getCentros() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM centro_educativo WHERE nombre != '' `);
        connection.end();
        return rows;
    }

    static async deleteCentro(codigoCentro, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM centro_educativo WHERE codigoCentro = ${connection.escape(codigoCentro)} `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha eliminado el centro con codigoCentro " ${connection.escape(codigoCentro)},'${user}',sysdate(), 'centro educativo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_CENTRO',"No se ha borrado el centro con codigo centro " ${connection.escape(codigoCentro)},'${user}',sysdate(), 'centro educativo')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async createCentro(centro, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO centro_educativo (codigoCentro, correo, telefono, provincia, nombre, CP, direccion) VALUES (${connection.escape(centro.codigoCentro)},${connection.escape(centro.correo)},${connection.escape(centro.telefono)},${connection.escape(centro.provincia)},${connection.escape(centro.nombre)},${connection.escape(centro.CP)},${connection.escape(centro.direccion)}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido centro con codigo " ${connection.escape(centro.codigoCentro)} ,'${user}',sysdate(), 'centro educativo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_CENTRO',"No se ha añadido el centro con codigo centro " ${connection.escape(centro.codigoCentro)},'${user}',sysdate(), 'centro educativo')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateCentro(centro, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE centro_educativo SET correo=${connection.escape(centro.correo)},telefono=${connection.escape(centro.telefono)},provincia=${connection.escape(centro.provincia)}, nombre=${connection.escape(centro.nombre)},CP=${connection.escape(centro.CP)},direccion=${connection.escape(centro.direccion)} WHERE codigoCentro = ${connection.escape(centro.codigoCentro)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado todo lo asociado al centro " ${connection.escape(centro.codigoCentro)} ,'${user}',sysdate(), 'centro educativo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_CENTRO',"No se ha podido actualizar el centro " ${connection.escape(centro.codigoCentro)} ,'${user}',sysdate(), 'centro educativo')`);


            throw err;
        } finally {
            await connection.release();
        }
    }
    static async deleteUserAndFPByCentro(codigoCentro, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE t1 FROM logs t1 INNER JOIN usuario t2 ON ( t1.usuario = t2.dni) WHERE t2.codigoCentro = ${connection.escape(codigoCentro)}`
            await connection.query(query)
            connection.query(`DELETE FROM usuario WHERE codigoCentro =   ${connection.escape(codigoCentro)}`);

            await connection.query(`DELETE t1 FROM modulo t1 INNER JOIN fp_duales t2 ON ( t1.fpDual = t2.id) WHERE t2.codigoCentro =  ${connection.escape(codigoCentro)}`);
            await connection.query(`DELETE t1 FROM empresa_fpdual t1 INNER JOIN fp_duales t2 ON ( t1.idFp = t2.id) WHERE t2.codigoCentro =  ${connection.escape(codigoCentro)}`);
            await connection.query(`DELETE FROM empresa where codigoCentro=  ${connection.escape(codigoCentro)}`);
            await connection.query(`DELETE FROM fp_duales WHERE codigoCentro =  ${connection.escape(codigoCentro)}`);

            await connection.query(`DELETE FROM centro_educativo WHERE codigoCentro =   ${connection.escape(codigoCentro)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado todo lo asociado al centro ' ,'${user}',sysdate(), 'centro educativo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_CENTRO','No se ha podido eliminar el centro ' ,'${user}',sysdate(), 'centro educativo')`);

            throw err;
        } finally {
            await connection.release();
        }
    }
};