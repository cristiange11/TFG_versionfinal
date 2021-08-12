const promisePool = require('../util/database');
const User = require('./user');
module.exports = class Profesor extends User {
    constructor(json) {
        super(json);
        this.departamento = departamento;
    }
    static async find(dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM profesor where dni = ${connection.escape(dni)}`);
        await connection.end();
        return res;
    }
    static async getProfesores() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM profesor `);
        await connection.end();
        return rows;
    }
    static async getProfesor(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.*, P.departamento, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario U, profesor P, profesor_modulo PM, modulo M WHERE U.dni = P.dni AND P.dni=PM.dni AND M.codigo = PM.codigoModulo AND U.dni=${connection.escape(dni)}`);
        await connection.end();
        return rows;
    }

    static async deleteProfesor(dni, user) {
        const connection = await promisePool.connection().getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM profesor WHERE dni = ${connection.escape(dni)} `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado profesor con DNI ${connection.escape(dni)} ",'${user}',sysdate(), 'profesor')`);

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR',"No se ha borrado profesor con DNI ${connection.escape(dni)} ",'${user}',sysdate(), 'profesor')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createProfesor(profesor, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES (${connection.escape(profesor.dni)},${connection.escape(profesor.nombre)},${connection.escape(profesor.apellidos)},${connection.escape(profesor.correo)},${connection.escape(profesor.movil)},${connection.escape(profesor.direccion)},${connection.escape(password)},${connection.escape(profesor.genero)},${connection.escape(profesor.cp)},${connection.escape(profesor.rol)},STR_TO_DATE(${connection.escape(profesor.fechaNacimiento)},'%Y-%m-%d'),${connection.escape(profesor.fpDual)},${connection.escape(profesor.codigoCentro)})`
            await connection.query(query)
            await connection.query(`INSERT INTO profesor(dni, departamento) VALUES (${connection.escape(profesor.dni)},${connection.escape(profesor.departamento)})`);
            const profesores = JSON.parse(JSON.stringify(profesor.modulo.modulo));

            for (var i = 0; i < profesores.length; i++) {

                const moduloInser = profesores[i];

                await connection.query(`INSERT INTO profesor_modulo (codigoModulo, dni) SELECT modulo.codigo, profesor.dni FROM modulo, profesor WHERE modulo.codigo = ${connection.escape(moduloInser)} AND profesor.dni=${connection.escape(profesor.dni)}`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido profesor con DNI ${connection.escape(profesor.dni)} ",'${user}',sysdate(), 'profesor')`);

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_PROFESOR',"No se ha añadido profesor con DNI ${connection.escape(profesor.dni)}",'${user}',sysdate(), 'profesor')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateProfesor(profesor, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre=${connection.escape(profesor.nombre)},apellidos=${connection.escape(profesor.apellidos)},correo=${connection.escape(profesor.correo)}, movil=${connection.escape(profesor.movil)},direccion=${connection.escape(profesor.direccion)},password=${connection.escape(password)},genero=${connection.escape(profesor.genero)}, cp=${connection.escape(profesor.cp)},rol=${connection.escape(profesor.rol)},fechaNacimiento=STR_TO_DATE(${connection.escape(profesor.fechaNacimiento)},'%Y-%m-%d'),fpDual=${connection.escape(profesor.fpDual)},codigoCentro=${connection.escape(profesor.codigoCentro)} WHERE dni=${connection.escape(profesor.dni)}`;
            await connection.query(query);
            await connection.query(`UPDATE profesor SET departamento=${connection.escape(profesor.departamento)} WHERE dni = ${connection.escape(profesor.dni)}`);
            await connection.query(`DELETE  FROM profesor_modulo WHERE DNI = ${connection.escape(profesor.dni)}`);
            const profesores = JSON.parse(JSON.stringify(profesor.modulo.modulo));

            for (var i = 0; i < profesores.length; i++) {

                const moduloInser = profesores[i];

                await connection.query(`INSERT INTO profesor_modulo (codigoModulo, dni) SELECT modulo.codigo, profesor.dni FROM modulo, profesor WHERE modulo.codigo = ${connection.escape(moduloInser)} AND profesor.dni=${connection.escape(profesor.dni)}`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado profesor con DNI ${connection.escape(profesor.dni)} ",'${user}',sysdate(), 'profesor')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR',"No se ha actualizado profesor con DNI ${connection.escape(profesor.dni)} ",'${user}',sysdate(), 'profesor')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
};