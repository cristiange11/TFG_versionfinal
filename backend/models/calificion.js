const promisePool = require('../util/database');
const User = require('./user');

module.exports = class Calificacion {
    constructor(dni, nota, descripcion, codigoModulo) {
        this.dni = dni;
        this.nota = nota;
        this.descripcion = descripcion;
        this.codigoModulo = codigoModulo;
    }

    static async getCalificaciones(codigoModulo) {
        const [rows, fields] = await promisePool.query(`SELECT C.*, U.nombre as nombreUsuario, U.apellidos as apellidoUsuario FROM calificacion as C, usuario as U where U.dni = C.dni and C.codigoModulo = ${codigoModulo}`);
        return rows;
    }

    static async deleteCalificacion(id, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM calificacion WHERE id = ${id} `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado calificacion con id ${id} ','${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_CALIFICACION','No se ha borrado la calificación','${user}',sysdate(), 'calificacion')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createCalificacion(calificacion, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO calificacion(dni, nota, descripcion, codigoModulo ) VALUES ('${calificacion.dni}','${calificacion.nota}','${calificacion.descripcion}','${calificacion.codigoModulo}')`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido calificación del alumno ${calificacion.dni} ','${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_CALIFICACION','No se ha añadido la calificación del alumno ${calificacion.dni}','${user}',sysdate(), 'calificacion')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateCalificacion(calificacion, user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE calificacion SET nota='${calificacion.nota}',descripcion='${calificacion.descripcion}'  where id = ${calificacion.id}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado la calificación al alumno con DNI ${calificacion.dni} ','${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_CALIFICACION','No se ha actualizado la calificación al alumno con DNI ${calificacion.dni}','${user}',sysdate(), 'calificacion')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }

};
