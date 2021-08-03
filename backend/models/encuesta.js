const promisePool = require('../util/database');

module.exports = class ResultadoAprendizaje {
    constructor(id, codigoModulo, titulo, descripcion, resultado, dniAlumno, dniTutorEmpresa) {
        this.id = id;
        this.codigoModulo = codigoModulo;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.resultado = resultado;
        this.dniAlumno = dniAlumno;
        this.dniTutorEmpresa = dniTutorEmpresa;
    }

    static async getEncuestas(codigoModulo) {
        const [rows, fields] = await promisePool.query(
            `SELECT encuesta.*, A.nombre as nombreAlumno, A.apellidos as apellidoAlumno, T.nombre as nombreTutor, T.apellidos as apellidoTutor, R.resultado as resultado FROM encuesta left JOIN usuario as A on encuesta.dniAlumno= A.dni left JOIN usuario as T on encuesta.dniTutorEmpresa = T.dni left join resultado_encuesta as R on (R.id = encuesta.resultado ) where encuesta.codigoModulo= ${codigoModulo}`);
        return rows;
    }
    static async getEncuesta(id) {

        const [rows, fields] = await promisePool.query(
            `SELECT observaciones FROM encuesta where id = ${id}`);
        return rows;
    }
    static async deleteEncuesta(id, user) {
        const connection = await promisePool.getConnection();
        console.log(`DELETE FROM encuesta WHERE id =  ${id}`)
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM encuesta WHERE id =  ${id}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado la encuesta aprendizaje ${id}' ,'${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_ENCUESTA','No se ha podido eliminar la encuesta ' ,'${user}',sysdate(), 'encuesta')`);
            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createEncuesta(encuesta, user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO encuesta(codigoModulo, titulo, descripcion, dniAlumno, dniTutorEmpresa) VALUES (${encuesta.codigoModulo},'${encuesta.titulo}','${encuesta.descripcion}', '${encuesta.dniAlumno}' , '${encuesta.dniTutorEmpresa}' ) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha creado la encuesta con título ${encuesta.titulo} ','${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ENCUESTA','No se ha añadido la encuesta con título ${encuesta.titulo}','${user}',sysdate(), 'encuesta')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateEncuesta(encuesta, user) {
        const connection = await promisePool.getConnection();
        console.log()
        console.log(`UPDATE encuesta SET codigoModulo='${encuesta.codigoModulo}', titulo='${encuesta.titulo}',descripcion='${encuesta.descripcion}', resultado = '${encuesta.resultado}', dniAlumno= '${encuesta.dniAlumno}' , dniTutorEmpresa = '${encuesta.dniTutorEmpresa}' WHERE id = '${encuesta.id}'`)
        try {
            await connection.beginTransaction();
            let query = `UPDATE encuesta SET codigoModulo='${encuesta.codigoModulo}', observaciones = '${encuesta.observaciones}' , titulo='${encuesta.titulo}',descripcion='${encuesta.descripcion}', resultado = '${encuesta.resultado}' WHERE id = '${encuesta.id}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado la encuesta con id ${encuesta.id} ','${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_ENCUESTA','No se ha actualizado la encuesta con id ${encuesta.id}','${user}',sysdate(), 'encuesta')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
};