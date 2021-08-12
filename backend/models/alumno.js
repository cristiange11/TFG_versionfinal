const promisePool = require('../util/database');
const User = require('./user');
const mysql = require('mysql');
module.exports = class Alumno extends User {
    constructor(json) {
        super(json);
        this.numeroExpediente = numeroExpediente;
    }
    static async find(dni) {
        const connection = await promisePool.connection();
        var sql    = 'SELECT * FROM alumno where dni = ' + connection.escape(dni);
        const res = await connection.query(sql);
            connection.end();
            return res;
    }
    static async findExpediente(numeroExpediente, dni) {
        const connection = await promisePool.connection();
        const res= await connection.query(
            `SELECT * FROM alumno where numeroExpediente = '${numeroExpediente}' AND dni != '${dni}'`);
            connection.end();
            return res;
        }

    static async getAlumnos() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM alumno `);
            connection.end();
        return rows;
    }
    static async getCalificacionesAlumno(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT AM.dni, AM.codigoModulo, C.nota,M.nombre as nombreModulo FROM modulo as M, alumno_modulo as AM LEFT JOIN calificacion as C ON AM.codigoModulo = C.codigoModulo where M.codigo = AM.codigoModulo and AM.dni ="${dni}"`);
        connection.end();
        return rows;
    }
    static async getAlumnosByModulo(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT AM.dni, AM.codigoModulo, C.nota,M.nombre as nombreModulo, U.* FROM usuario as U,modulo as M, alumno_modulo as AM LEFT JOIN calificacion as C ON AM.codigoModulo = C.codigoModulo where M.codigo = AM.codigoModulo and AM.codigoModulo =${codigoModulo} and C.nota is null and AM.dni = U.dni`);
        connection.end();
        return rows;
    }
    static async getAlumnosByModuloEncuesta(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.* FROM usuario as U, modulo as M where U.rol=5 AND M.codigo = ${codigoModulo} `);
        connection.end();
        return rows;
    }
    static async getAlumno(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT U.*, A.numeroExpediente, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario U, alumno A, alumno_modulo AM, modulo M WHERE U.dni = A.dni AND A.dni=AM.dni AND M.codigo = AM.codigoModulo AND U.dni='${dni}'`
        );
        connection.end();
        return rows;
    }

    static async deleteAlumno(dni, user) {
        const connection = await promisePool.connection().getConnection();       

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM alumno WHERE dni = '${dni}' `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado alumno con DNI ${dni} ','${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_ALUMNO','No se ha borrado el alumno con DNI ${dni}','${user}',sysdate(), 'alumno')`);
            
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createAlumno(alumno, password, user) {
        const connection = await promisePool.connection().getConnection();       

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${alumno.dni}','${alumno.nombre}','${alumno.apellidos}','${alumno.correo}','${alumno.movil}','${alumno.direccion}','${password}','${alumno.genero}',${alumno.cp},'${alumno.rol}',STR_TO_DATE('${alumno.fechaNacimiento}','%Y-%m-%d'),'${alumno.fpDual}','${alumno.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO alumno(dni, numeroExpediente) VALUES ('${alumno.dni}','${alumno.numeroExpediente}')`);
            await connection.query(`UPDATE fp_duales SET plazasDisponibles=plazasDisponibles-1 WHERE id = ${alumno.fpDual}`);
            await connection.query(`INSERT INTO alumno_modulo (codigoModulo, dni) SELECT modulo.codigo, alumno.dni FROM modulo, alumno WHERE modulo.curso =1 AND alumno.dni="${alumno.dni}"`)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido alumno con DNI ${alumno.dni} ','${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ALUMNO','No se ha añadido el alumno con DNI ${alumno.dni}','${user}',sysdate(), 'alumno')`);
            
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateAlumno(alumno, password, user) {
        const connection = await promisePool.connection().getConnection();       
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre='${alumno.nombre}',apellidos='${alumno.apellidos}',correo='${alumno.correo}', movil='${alumno.movil}',direccion='${alumno.direccion}',password='${password}',genero='${alumno.genero}', cp='${alumno.cp}',fechaNacimiento=STR_TO_DATE('${alumno.fechaNacimiento}','%Y-%m-%d') WHERE dni='${alumno.dni}'`;
            await connection.query(query);
            await connection.query(`UPDATE alumno SET numeroExpediente='${alumno.numeroExpediente}' WHERE dni = '${alumno.dni}'`);
            await connection.query(`DELETE  FROM alumno_modulo WHERE DNI = '${alumno.dni}'`);
            const alum = JSON.parse(JSON.stringify(alumno.modulo.modulo));
            
            for (var i = 0; i < alum.length; i++) {
                const moduloInser = alum[i];
                await connection.query(`INSERT INTO alumno_modulo (codigoModulo, dni) SELECT modulo.codigo, alumno.dni FROM modulo, alumno WHERE modulo.codigo = ${moduloInser} AND alumno.dni='${alumno.dni}'`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido alumno con DNI ${alumno.dni} ','${user}',sysdate(), 'alumno')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ALUMNO','No se ha añadido el alumno con DNI ${alumno.dni}','${user}',sysdate(), 'alumno')`);
            throw err;
        } finally {
            await connection.release();
        }
    }

};
