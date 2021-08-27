const promisePool = require('../util/database');
const User = require('./user');
const Modulo = require('./modulo');
module.exports = class Calificacion {
    constructor(dni, nota, descripcion, codigoModulo) {
        this.dni = dni;
        this.nota = nota;
        this.descripcion = descripcion;
        this.codigoModulo = codigoModulo;
    }

    static async getCalificaciones(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT C.*, U.nombre as nombreUsuario, U.apellidos as apellidoUsuario FROM calificacion as C, usuario as U where U.dni = C.dni and C.codigoModulo =  ${connection.escape(codigoModulo)}`);
        connection.end();
        return rows;
    }
    static async getCalificacion(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM calificacion where id =  ${connection.escape(id)}`);
        connection.end();
        return rows;
    }

    static async deleteCalificacion(id, user) {
        const connection = await promisePool.connection().getConnection();
        let calificacion = await this.getCalificacion(id);

        let modulo = await Modulo.getModulo(calificacion[0].codigoModulo)

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM calificacion WHERE id =  ${connection.escape(id)} `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado calificacion del módulo " ${connection.escape(modulo[0].nombre)} " al alumno " ${connection.escape(calificacion[0].dni)},'${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_CALIFICACION',"No se ha borrado la calificación del módulo " ${connection.escape(modulo[0].nombre)} " al alumno " ${connection.escape(calificacion[0].dni)},'${user}',sysdate(), 'calificacion')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createCalificacion(calificacion, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO calificacion(dni, nota, descripcion, codigoModulo ) VALUES (${connection.escape(calificacion.dni)},${connection.escape(calificacion.nota)},${connection.escape(calificacion.descripcion)},${connection.escape(calificacion.codigoModulo)})`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido calificación del alumno " ${connection.escape(calificacion.dni)},'${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_CALIFICACION',"No se ha añadido la calificación del alumno "${connection.escape(calificacion.dni)},'${user}',sysdate(), 'calificacion')`);

            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateCalificacion(calificacion, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE calificacion SET nota=${connection.escape(calificacion.nota)},descripcion=${connection.escape(calificacion.descripcion)} where id = ${connection.escape(calificacion.id)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado la calificación al alumno con DNI " ${connection.escape(calificacion.dni)} ,'${user}',sysdate(), 'calificacion')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_CALIFICACION',"No se ha actualizado la calificación al alumno con DNI " ${connection.escape(calificacion.dni)},'${user}',sysdate(), 'calificacion')`);

            throw err;
        } finally {
            await connection.release();
        }
    }

};
