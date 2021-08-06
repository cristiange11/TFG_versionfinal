const promisePool = require('../util/database');

module.exports = class ResultadoAprendizaje {
    constructor(id, codigoModulo, titulo, descripcion) {
        this.id = id;
        this.codigoModulo = codigoModulo;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    static async getResultadoAprendizajes(codigoModulo) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM resultado_aprendizaje where codigoModulo = ${codigoModulo}`);
        return rows;
    }
    static async deleteResultadoAprendizaje(id, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM resultado_aprendizaje WHERE id =  ${id}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado el resultado aprendizaje ${id}' ,'${user}',sysdate(), 'resultado aprendizaje')`);
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
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO resultado_aprendizaje(codigoModulo, titulo, descripcion) VALUES ('${resultadoAprendizaje.codigoModulo}','${resultadoAprendizaje.titulo}','${resultadoAprendizaje.descripcion}' ) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha creado el resultado aprendizaje  ','${user}',sysdate(), 'resultado aprendizaje')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_RESULTADOAPRENDIZAJE','No se ha añadido el resultado aprendizaje con ','${user}',sysdate(), 'resultado aprendizaje')`);
           
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateResultadoAprendizaje(resultadoAprendizaje, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE resultado_aprendizaje SET codigoModulo='${resultadoAprendizaje.codigoModulo}', titulo='${resultadoAprendizaje.titulo}',descripcion='${resultadoAprendizaje.descripcion}' WHERE id = '${resultadoAprendizaje.id}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado el resultado de aprendizaje con id ${resultadoAprendizaje.id} ','${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_RESULTADOAPRENDIZAJE','No se ha actualizado el resultado de aprendizaje con id ${resultadoAprendizaje.id}','${user}',sysdate(), 'modulo')`);
            
            throw err;
        } finally {
            await connection.release();
        }

    }
};