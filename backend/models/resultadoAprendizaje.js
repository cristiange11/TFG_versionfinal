const promisePool = require('../util/database');
const Modulo = require('./modulo');
module.exports = class ResultadoAprendizaje {
    constructor(id, codigoModulo, titulo, descripcion) {
        this.id = id;
        this.codigoModulo = codigoModulo;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    static async getResultadoAprendizajes(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM resultado_aprendizaje where codigoModulo = ${connection.escape(codigoModulo)}`);
        await connection.end();
        return rows;
    }
    static async deleteResultadoAprendizaje(id, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM resultado_aprendizaje WHERE id =  ${connection.escape(id)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha eliminado el resultado aprendizaje " ${connection.escape(id)} ,'${user}',sysdate(), 'resultado aprendizaje')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_RESULTADOAPRENDIZAJE','No se ha podido eliminar el resultado aprendizaje ' ,'${user}',sysdate(), 'resultado aprendizaje')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createResultadoAprendizaje(resultadoAprendizaje, user) {
        const connection = await promisePool.connection().getConnection();
        let modulo = await Modulo.getModulo(resultadoAprendizaje.codigoModulo)
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO resultado_aprendizaje(codigoModulo, titulo, descripcion) VALUES (${connection.escape(resultadoAprendizaje.codigoModulo)},${connection.escape(resultadoAprendizaje.titulo)},${connection.escape(resultadoAprendizaje.descripcion)} ) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha creado el resultado aprendizaje " ${connection.escape(resultadoAprendizaje.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'resultado aprendizaje')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_RESULTADOAPRENDIZAJE',"No se ha añadido el resultado aprendizaje " ${connection.escape(resultadoAprendizaje.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'resultado aprendizaje')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateResultadoAprendizaje(resultadoAprendizaje, user) {
        const connection = await promisePool.connection().getConnection();
        let modulo = await Modulo.getModulo(resultadoAprendizaje.codigoModulo)

        try {
            await connection.beginTransaction();
            let query = `UPDATE resultado_aprendizaje SET codigoModulo=${connection.escape(resultadoAprendizaje.codigoModulo)}, titulo=${connection.escape(resultadoAprendizaje.titulo)},descripcion=${connection.escape(resultadoAprendizaje.descripcion)} WHERE id = ${connection.escape(resultadoAprendizaje.id)}`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado el resultado de aprendizaje " ${connection.escape(resultadoAprendizaje.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)} ,'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_RESULTADOAPRENDIZAJE',"No se ha actualizado el resultado de aprendizaje " ${connection.escape(resultadoAprendizaje.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'modulo')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
};