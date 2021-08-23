const promisePool = require('../util/database');
const Modulo = require('./modulo');
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
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT encuesta.*, A.nombre as nombreAlumno, A.apellidos as apellidoAlumno, T.nombre as nombreTutor, T.apellidos as apellidoTutor, R.resultado as resultado FROM encuesta left JOIN usuario as A on encuesta.dniAlumno= A.dni left JOIN usuario as T on encuesta.dniTutoroAdmin = T.dni left join resultado_encuesta as R on (R.id = encuesta.resultado ) where encuesta.codigoModulo= ${connection.escape(codigoModulo)}`);
        await connection.end();
        return rows;
    }
    static async getEncuestaByTutor(dni,codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT encuesta.*, A.nombre as nombreAlumno, A.apellidos as apellidoAlumno, T.nombre as nombreTutor, T.apellidos as apellidoTutor, R.resultado as resultado FROM encuesta left JOIN usuario as A on encuesta.dniAlumno= A.dni left JOIN usuario as T on encuesta.dniTutoroAdmin = T.dni left join resultado_encuesta as R on (R.id = encuesta.resultado ) where encuesta.dniTutoroAdmin= ${connection.escape(dni)} and encuesta.codigoModulo= ${connection.escape(codigoModulo)}`);
        await connection.end();
        return rows;
    }
    static async getEncuesta(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT observaciones FROM encuesta where id =${connection.escape(id)}`);
        await connection.end();
        return rows;
    }
    static async getAllByEncuesta(id) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM encuesta where id =${connection.escape(id)}`);
        await connection.end();
        return rows;
    }
    static async deleteEncuesta(id, user) {
        
        const connection = await promisePool.connection().getConnection();   
        let encuesta = await this.getAllByEncuesta(id);    
        let modulo = await Modulo.getModulo(encuesta[0].codigoModulo)
        try {
            await connection.beginTransaction();            
            let query = `DELETE FROM encuesta WHERE id =  ${connection.escape(id)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha eliminado la encuesta  " ${connection.escape(encuesta[0].titulo)} " del módulo " ${connection.escape(modulo[0].nombre)}  ,'${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_ENCUESTA',"No se ha podido eliminar la encuesta " ${connection.escape(encuesta[0].titulo)} " del módulo " ${connection.escape(modulo[0].nombre)} ,'${user}',sysdate(), 'encuesta')`);
   
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createEncuesta(encuesta, user) {
        let observaciones = encuesta.observaciones == null ? null : `${encuesta.observaciones}`;
        let modulo = await Modulo.getModulo(encuesta.codigoModulo)
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO encuesta(codigoModulo, titulo, descripcion, dniAlumno, dniTutoroAdmin, resultado, observaciones) VALUES (${connection.escape(encuesta.codigoModulo)},${connection.escape(encuesta.titulo)},${connection.escape(encuesta.descripcion)}, ${connection.escape(encuesta.dniAlumno)} , ${connection.escape(encuesta.dniTutorEmpresa)}, ${connection.escape(encuesta.resultado)} , ${connection.escape(observaciones)}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha creado la encuesta con título " ${connection.escape(encuesta.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ENCUESTA',"No se ha añadido la encuesta con título " ${connection.escape(encuesta.titulo)} " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'encuesta')`);
           
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateEncuesta(encuesta, user) {
        let observaciones = encuesta.observaciones == null ? null : `${encuesta.observaciones}`;
        let modulo = await Modulo.getModulo(encuesta.codigoModulo)
        const connection = await promisePool.connection().getConnection();       
        try {
            await connection.beginTransaction();
            let query = `UPDATE encuesta SET codigoModulo=${connection.escape(encuesta.codigoModulo)}, observaciones = ${connection.escape(observaciones)} , titulo=${connection.escape(encuesta.titulo)},descripcion=${connection.escape(encuesta.descripcion)}, resultado = ${connection.escape(encuesta.resultado)} WHERE id = ${connection.escape(encuesta.id)}`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado la encuesta  " ${connection.escape(encuesta.titulo)}  " del módulo " ${connection.escape(modulo[0].nombre)} ,'${user}',sysdate(), 'encuesta')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_ENCUESTA',"No se ha actualizado la encuesta ${connection.escape(encuesta.titulo)}  " del módulo " ${connection.escape(modulo[0].nombre)},'${user}',sysdate(), 'encuesta')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
};