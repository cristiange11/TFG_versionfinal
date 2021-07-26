const promisePool = require('../util/database');
const User = require('./user');
module.exports = class Profesor extends User {
    constructor(json) {
        super(json);
        this.departamento = departamento;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM profesor where dni = '${dni}'`);
    }
    static async getProfesores() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM profesor `);
        return rows;
    }

    static async deleteProfesor(dni, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM profesor WHERE dni = '${dni}' `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado profesor con DNI ${dni} ','${user}',sysdate(), 'profesor')`);

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR','No se ha borrado profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createProfesor(profesor, password, user) {
        const connection = await promisePool.getConnection();
        console.log(profesor.modulo)
        console.log(`INSERT INTO profesor_modulo (codigoModulo, dni) SELECT modulo.codigo, profesor.dni FROM modulo, profesor WHERE modulo.codigo = ${profesor.modulo.modulo} AND profesor.dni="${profesor.dni}"`)
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${profesor.dni}','${profesor.nombre}','${profesor.apellidos}','${profesor.correo}','${profesor.movil}','${profesor.direccion}','${password}','${profesor.genero}',${profesor.cp},'${profesor.rol}',STR_TO_DATE('${profesor.fechaNacimiento}','%Y-%m-%d'),'${profesor.fpDual}','${profesor.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO profesor(dni, departamento) VALUES ('${profesor.dni}','${profesor.departamento}')`);
            const profesores = JSON.parse(JSON.stringify(profesor.modulo.modulo));

            for (var i = 0; i < profesores.length; i++) {

                const moduloInser = profesores[i];

                await connection.query(`INSERT INTO profesor_modulo (codigoModulo, dni) SELECT modulo.codigo, profesor.dni FROM modulo, profesor WHERE modulo.codigo = ${moduloInser} AND profesor.dni='${profesor.dni}'`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_PROFESOR','No se ha añadido profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateProfesor(profesor, password, user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre='${profesor.nombre}',apellidos='${profesor.apellidos}',correo='${profesor.correo}', movil='${profesor.movil}',direccion='${profesor.direccion}',password='${password}',genero='${profesor.genero}', cp='${profesor.cp}',rol='${profesor.rol}',fechaNacimiento=STR_TO_DATE('${profesor.fechaNacimiento}','%Y-%m-%d'),fpDual=${profesor.fpDual},codigoCentro='${profesor.codigoCentro}' WHERE dni='${profesor.dni}'`;
            await connection.query(query);
            await connection.query(`UPDATE profesor SET departamento='${profesor.departamento}' WHERE dni = '${profesor.dni}'`);
            await connection.query(`DELETE  FROM profesor_modulo WHERE DNI = '${profesor.dni}'`);
            profesor.modulo.modulo.forEach(async (moduloInser) => {
                await connection.query(`INSERT INTO profesor_modulo (codigoModulo, dni) SELECT modulo.codigo, profesor.dni FROM modulo, profesor WHERE modulo.codigo = ${moduloInser} AND profesor.dni='${profesor.dni}'`);
            })
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_PROFESOR','No se ha actualizado profesor con DNI ${profesor.dni} ','${user}',sysdate(), 'profesor')`);
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
};