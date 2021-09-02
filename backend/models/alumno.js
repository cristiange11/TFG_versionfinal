const promisePool = require('../util/database');
const User = require('./user');

module.exports = class Alumno extends User {
    constructor(json) {
        super(json);
        this.numeroExpediente = numeroExpediente;
    }
    //Método utilizado para buscar un usuario
    static async find(dni) {
        const connection = await promisePool.connection();
        var sql = `SELECT * FROM alumno where dni =  ${connection.escape(dni)}`;
        const res = await connection.query(sql);
        connection.end();
        return res;
    }
    //Método utilizado para comprobar que el numero del expediente del alumno no está en uso
    static async findExpediente(numeroExpediente, dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM alumno where numeroExpediente = ${connection.escape(numeroExpediente)} AND dni != ${connection.escape(dni)}`);
        connection.end();
        return res;
    }
    //Método utilizado para obtener un listado de los alumnos
    static async getAlumnos() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM alumno `);
        connection.end();
        return rows;
    }
    //Método utilizado para obtener las calificaciones de un alumno
    static async getCalificacionesAlumno(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT AM.dni, AM.codigoModulo, C.nota,M.nombre as nombreModulo FROM modulo as M, alumno_modulo as AM LEFT JOIN calificacion as C ON AM.codigoModulo = C.codigoModulo AND C.dni=AM.dni where M.codigo = AM.codigoModulo AND  AM.dni =${connection.escape(dni)}`);
        connection.end();
        return rows;
    }
    //Método utilizado para obtener los alumnos de un módulo
    static async getAlumnosByModulo(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT AM.dni, AM.codigoModulo,M.nombre as nombreModulo, U.* FROM usuario as U,modulo as M, alumno_modulo as AM WHERE NOT EXISTS (SELECT * FROM calificacion as C where C.dni = U.dni AND C.codigoModulo=${connection.escape(codigoModulo)}) AND U.dni = AM.dni AND AM.codigoModulo = ${connection.escape(codigoModulo)} and M.codigo = AM.codigoModulo`);
        connection.end();
        return rows;
    }
    //Método utilizado para obtener los alumnos de un módulo para añadirles encuestas
    static async getAlumnosByModuloEncuesta(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.* FROM usuario as U, modulo as M, alumno_modulo as AM where U.rol=5 AND M.codigo = ${connection.escape(codigoModulo)} AND AM.dni = U.dni AND AM.codigoModulo = M.codigo `);
        connection.end();
        return rows;
    }
    //Método para obtener un alumno
    static async getAlumno(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.*, A.numeroExpediente, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario U, alumno A, alumno_modulo AM, modulo M WHERE U.dni = A.dni AND A.dni=AM.dni AND M.codigo = AM.codigoModulo AND U.dni=${connection.escape(dni)}`);
        connection.end();
        return rows;
    }
    //Método para eliminar un alumno
    static async deleteAlumno(dni, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM alumno WHERE dni = ${connection.escape(dni)} `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado alumno con DNI "${connection.escape(dni)} ,'${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_ALUMNO',"No se ha borrado el alumno con DNI "${connection.escape(dni)},'${user}',sysdate(), 'alumno')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para crear un alumno
    static async createAlumno(alumno, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES (${connection.escape(alumno.dni)},${connection.escape(alumno.nombre)},${connection.escape(alumno.apellidos)},${connection.escape(alumno.correo)},${connection.escape(alumno.movil)},${connection.escape(alumno.direccion)},${connection.escape(password)},${connection.escape(alumno.genero)},${connection.escape(alumno.cp)},${connection.escape(alumno.rol)},STR_TO_DATE(${connection.escape(alumno.fechaNacimiento)},'%Y-%m-%d'),${connection.escape(alumno.fpDual)},${connection.escape(alumno.codigoCentro)})`
            await connection.query(query)
            await connection.query(`INSERT INTO alumno(dni, numeroExpediente) VALUES (${connection.escape(alumno.dni)},${connection.escape(alumno.numeroExpediente)})`);
            await connection.query(`UPDATE fp_duales SET plazasDisponibles=plazasDisponibles-1 WHERE id = ${connection.escape(alumno.fpDual)}`);
            await connection.query(`INSERT INTO alumno_modulo (codigoModulo, dni) SELECT modulo.codigo, alumno.dni FROM modulo, alumno WHERE modulo.curso =1 AND alumno.dni=${connection.escape(alumno.dni)} AND modulo.fpDual =${connection.escape(alumno.fpDual)} `)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido alumno con DNI " ${connection.escape(alumno.dni)},'${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ALUMNO',"No se ha añadido el alumno con DNI " ${connection.escape(alumno.dni)},'${user}',sysdate(), 'alumno')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para actualizar un alumno
    static async updateAlumno(alumno, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre=${connection.escape(alumno.nombre)},apellidos=${connection.escape(alumno.apellidos)},correo=${connection.escape(alumno.correo)}, movil=${connection.escape(alumno.movil)},direccion=${connection.escape(alumno.direccion)},password=${connection.escape(password)},genero=${connection.escape(alumno.genero)}, cp=${connection.escape(alumno.cp)},fechaNacimiento=STR_TO_DATE(${connection.escape(alumno.fechaNacimiento)},'%Y-%m-%d') WHERE dni=${connection.escape(alumno.dni)}`;
            await connection.query(query);
            await connection.query(`UPDATE alumno SET numeroExpediente=${connection.escape(alumno.numeroExpediente)} WHERE dni = ${connection.escape(alumno.dni)}`);
            await connection.query(`DELETE  FROM alumno_modulo WHERE DNI = ${connection.escape(alumno.dni)}`);
            const alum = JSON.parse(JSON.stringify(alumno.modulo.modulo));

            for (var i = 0; i < alum.length; i++) {
                const moduloInser = alum[i];
                await connection.query(`INSERT INTO alumno_modulo (codigoModulo, dni) SELECT modulo.codigo, alumno.dni FROM modulo, alumno WHERE modulo.codigo = ${connection.escape(moduloInser)} AND alumno.dni='${alumno.dni}'`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado alumno con DNI " ${connection.escape(alumno.dni)} ,'${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_ALUMNO',"No se ha actualizado el alumno con DNI " ${connection.escape(alumno.dni)},'${user}',sysdate(), 'alumno')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
};
