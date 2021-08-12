const promisePool = require('../util/database');

module.exports = class Modulo {
    constructor(codigo, nombre, descripcion, curso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }
    static async find(codigo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM modulo where codigo = ${codigo}`);
            await connection.end();
        return rows;
    }
    static async getModulos(fpDual) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM modulo where fpDual = ${fpDual}`);
            await connection.end();
        return rows;
    }
    static async getModulosProf(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT M.* FROM modulo M, profesor_modulo PM, profesor P WHERE P.dni = PM.dni AND PM.codigoModulo = M.codigo AND P.dni = "${dni}"`);
            await connection.end();
        return rows;
    }
    static async getModulosTut(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT M.* FROM modulo M, tutor_modulo TM, tutor_empresa T WHERE T.dni = TM.dni AND TM.codigoModulo = M.codigo AND T.dni = "${dni}"`);
            await connection.end();
            return rows;
    }
    static async getModulosAlum(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT M.* FROM modulo as M, alumno_modulo as AM, alumno as A WHERE A.dni = AM.dni AND AM.codigoModulo = M.codigo AND A.dni = "${dni}"`);
            await connection.end();
            return rows;
    }
    static async getModulosAlumUpdate(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.*, M.nombre as nombreModulo, M.codigo as codigoModulo, A.numeroExpediente, C.nota FROM alumno as A, usuario as U, modulo as M left join calificacion as C on C.codigoModulo = M.codigo AND C.dni = '${dni}' where U.rol=5 AND U.dni='${dni}' AND A.dni = U.dni AND C.nota is NULL or C.nota < 5`);
        await connection.end();
        return rows;
    }

    static async deleteModulo(codigo, user) {
        const connection = await promisePool.connection().getConnection();       

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM modulo WHERE codigo =  ${codigo}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado el módulo ${codigo}' ,'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_MODULO','No se ha podido eliminar el módulo ' ,'${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async deleteAllBymodulo(codigo, user) {
        const connection = await promisePool.connection().getConnection();       

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

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createModulo(modulo, user) {
        const connection = await promisePool.connection().getConnection();       
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO modulo(nombre, descripcion, curso, fpDual) VALUES ('${modulo.nombre}','${modulo.descripcion}','${modulo.curso}', ${modulo.fpDual}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha creado el modulo con nombre ${modulo.nombre} ','${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_MODULO','No se ha añadido modulo con el nombre ${modulo.nombre}','${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateModulo(modulo, user) {
        const connection = await promisePool.connection().getConnection();       

        try {
            await connection.beginTransaction();
            let query = `UPDATE modulo SET nombre='${modulo.nombre}', descripcion='${modulo.descripcion}',curso='${modulo.curso}', fpDual = ${modulo.fpDual} WHERE codigo = '${modulo.codigo}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado el modulo con id ${modulo.id} ','${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_MODULO','No se ha actualizado el modulo con id ${modulo.id}','${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
};