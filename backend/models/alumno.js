const promisePool = require('../util/database');
const User = require('./user');

module.exports = class Alumno extends User {
    constructor(json) {
        super(json);
        this.numeroExpediente = numeroExpediente;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM alumno where dni = '${dni}'`);
    }
    static async findExpediente(numeroExpediente, dni) {
       
        return await promisePool.query(
            `SELECT * FROM alumno where numeroExpediente = '${numeroExpediente}' AND dni != '${dni}'`);
    }
  
    static async getAlumnos() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM alumno `);
        return rows;
    }
    static async getAlumno(dni) {
        console.log (`SELECT U.*, A.numeroExpediente, M.nombre as nombreModulo FROM usuario U, alumno A, alumno_modulo AM, modulo M WHERE U.dni = A.dni AND A.dni=AM.dni AND M.codigo = AM.codigoModulo AND U.dni='${dni}'`)
        const [rows, fields] = await promisePool.query(
            `SELECT U.*, A.numeroExpediente, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario U, alumno A, alumno_modulo AM, modulo M WHERE U.dni = A.dni AND A.dni=AM.dni AND M.codigo = AM.codigoModulo AND U.dni='${dni}'`
        );
        return rows;
    }

    static async deleteAlumno(dni , user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM alumno WHERE dni = '${dni}' `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado alumno con DNI ${dni} ','${user}',sysdate(), 'alumno')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_ALUMNO','No se ha borrado el alumno con DNI ${dni}','${user}',sysdate(), 'alumno')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
       
    }
    static async createAlumno(alumno, password, user) {
        const connection = await promisePool.getConnection();
        
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
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateAlumno(alumno, password, user) {
        const connection = await promisePool.getConnection();
        console.log("entro a updatear alumno " + alumno)
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre='${alumno.nombre}',apellidos='${alumno.apellidos}',correo='${alumno.correo}', movil='${alumno.movil}',direccion='${alumno.direccion}',password='${password}',genero='${alumno.genero}', cp='${alumno.cp}',fechaNacimiento=STR_TO_DATE('${alumno.fechaNacimiento}','%Y-%m-%d') WHERE dni='${alumno.dni}'`;
            await connection.query(query);
            await connection.query(`UPDATE alumno SET numeroExpediente='${alumno.numeroExpediente}' WHERE dni = '${alumno.dni}'`);            
            await connection.query(`DELETE  FROM alumno_modulo WHERE DNI = '${alumno.dni}'`);
            const alum = JSON.parse(JSON.stringify(alumno.modulo.modulo));
            console.log(alumno.modulo.modulo)
            for (var i = 0; i < alum.length; i++) {

                const moduloInser = alum[i];

                await connection.query(`INSERT INTO alumno_modulo (codigoModulo, dni) SELECT modulo.codigo, alumno.dni FROM modulo, alumno WHERE modulo.codigo = ${moduloInser} AND alumno.dni='${alumno.dni}'`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido alumno con DNI ${alumno.dni} ','${user}',sysdate(), 'alumno')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_ALUMNO','No se ha añadido el alumno con DNI ${alumno.dni}','${user}',sysdate(), 'alumno')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }

};
