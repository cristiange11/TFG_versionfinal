const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(nombre, descripcion, totalPlazas, anio, codigoCentro, plazasDisponibles) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.totalPlazas = totalPlazas;
        this.anio = anio;
        this.codigoCentro = codigoCentro;
        this.plazasDisponibles = plazasDisponibles;
    }
    //Método para obtener la información de un FP dual
    static async find(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM fp_duales WHERE id=${connection.escape(id)}  `);
        await connection.end();
        return rows;
    }
    //Método para obtener FP asociados al centro
    static async getNombreFPByCentro(codigoCentro) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT F.id, F.nombre FROM fp_duales as F, centro_educativo as C WHERE C.codigoCentro=F.codigoCentro and C.codigoCentro=${connection.escape(codigoCentro)}  `);
        await connection.end();
        return rows;
    }
    //Método para borrar todo lo asociado al FP dual
    static async DeleteUsuariosByFP(fpDual, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE t2 FROM usuario t1 JOIN logs t2 ON t2.usuario = t1.dni WHERE t1.fpDual = ${connection.escape(fpDual)}`;
            await connection.query(query);
            await connection.query(`DELETE t2 FROM usuario t1 JOIN calificacion t2 ON t2.dni = t1.dni WHERE t1.fpDual = ${connection.escape(fpDual)}`);
            await connection.query(`DELETE FROM usuario WHERE fpDual = ${connection.escape(fpDual)}`);
            await connection.query(`DELETE FROM empresa_fpdual  WHERE idFp =${connection.escape(fpDual)}`);
            await connection.query(`DELETE FROM modulo WHERE fpDual =  ${connection.escape(fpDual)}`);
            await connection.query(`DELETE FROM fp_duales WHERE id = ${connection.escape(fpDual)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado el FP " ${connection.escape(fpDual)},'${user}',sysdate(), 'FP')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK" + err);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_FP',"No Se ha borrado el FP " ${connection.escape(fpDual)},'${user}',sysdate(), 'FP')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para obtener un FP
    static async getFp(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM fp_duales where id = ${connection.escape(id)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener las plazas disponibles de un FP
    static async getPlazasDisponibles(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT plazasDisponibles FROM fp_duales WHERE id=${connection.escape(id)}  `);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener un listado de los FPs asociados a un centro
    static async getFpsByAdminCentro(codigoCentro) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT F.*,C.nombre as nombreCentro FROM fp_duales as F, centro_educativo as C WHERE C.codigoCentro = F.codigoCentro AND F.codigoCentro=${connection.escape(codigoCentro)}`);
        await connection.end();
        return rows;
    }
    //Método para obtener un listado de todos los FPs
    static async getFps() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT F.*,C.nombre as nombreCentro FROM fp_duales as F, centro_educativo as C WHERE C.codigoCentro = F.codigoCentro `);
        await connection.end();
        return rows;
    }
    //Método para obtener los FP duales que tengan como mínimo 1 plaza disponible
    static async getFpsConPlazasDisponibles(codigoCentro) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM fp_duales where plazasDisponibles > 0 AND codigoCentro =${connection.escape(codigoCentro)}`);
        await connection.end();
        return rows;
    }
    //Método para borrar un FP dual
    static async deleteFp(id, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM fp_duales WHERE id = ${connection.escape(id)} `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado el FP " ${connection.escape(id)},'${user}',sysdate(), 'FP')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_FP',"No se ha borrado el FP " ${connection.escape(id)} ,'${user}',sysdate(), 'FP')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para crear un FP
    static async createFp(fp, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO fp_duales (nombre, descripcion, totalPlazas, anio, codigoCentro, plazasDisponibles) VALUES (${connection.escape(fp.nombre)},${connection.escape(fp.descripcion)},${connection.escape(fp.totalPlazas)},${connection.escape(fp.anio)},${connection.escape(fp.codigoCentro)},${connection.escape(fp.plazasDisponibles)}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido FP ','${user}',sysdate(), 'FP')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_FP','No se ha añadido FP  ','${user}',sysdate(), 'FP')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para actualizar un FP
    static async updateFp(fp, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE fp_duales SET nombre=${connection.escape(fp.nombre)},descripcion=${connection.escape(fp.descripcion)},totalPlazas=${connection.escape(fp.totalPlazas)} ,anio=${connection.escape(fp.anio)},codigoCentro=${connection.escape(fp.codigoCentro)},plazasDisponibles=${connection.escape(fp.plazasDisponibles)} WHERE id = ${connection.escape(fp.id)} `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado el FP " ${connection.escape(fp.nombre)} " del centro " ${connection.escape(fp.codigoCentro)} ,'${user}',sysdate(), 'FP')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_FP',"No se ha actualizado FP " ${connection.escape(fp.nombre)} " del centro " ${connection.escape(fp.codigoCentro)},'${user}',sysdate(), 'FP')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
};