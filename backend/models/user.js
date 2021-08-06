const promisePool = require('../util/database');
const bcrypt = require('bcryptjs');
module.exports = class User {
    constructor(json) {
        this.dni = json.dni;
        this.nombre = json.nombre;
        this.apellidos = json.apellidos;
        this.correo = json.correo;
        this.movil = json.movil;
        this.direccion = json.direccion;
        this.password = json.password;
        this.genero = json.genero;
        this.cp = json.cp;
        this.rol = json.rol;
        this.fechaNacimiento = json.fechaNacimiento;
        this.fpDual = json.fpDual;
        this.codigoCentro = json.codigoCentro;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM usuario where dni = '${dni}'`);
    }

    static async comparePassword(password, password2) {
        return await bcrypt.compare(password, password2);
    }

    static async getUser(correo) {
        return await promisePool.query(`SELECT * FROM usuario where correo ='${correo}'`);
    }

    static async findMovil(movil, dni) {
        return await promisePool.query(
            `SELECT * FROM usuario where movil ='${movil}' AND dni !='${dni}'`);
    }
    static async findCorreo(correo, dni) {

        return await promisePool.query(
            `SELECT * FROM usuario where correo ='${correo}' AND dni !='${dni}'`);
    }
    static async updatePassword(correo, password) {
        this.getUser(correo).then(async function (resultado) {
            var cadena = JSON.stringify(resultado[0])
            var resJSON = JSON.parse(cadena)
            var dni = resJSON[0]['dni'];
            const connection = await promisePool.getConnection();
            try {
                await connection.beginTransaction();
                let query = `UPDATE usuario SET password = '${password}' WHERE correo='${correo}'`;
                await connection.query(query)
                await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'El usuario con DNI ${dni} ha actualizado su contraseña ','${dni}',sysdate(), 'user')`);
                await connection.commit();
            } catch (err) {
                await connection.query("ROLLBACK");
                await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_USER','El usuario con DNI ${resultado.dni} no ha actualizado su contraseña','${resultado.dni}',sysdate(), 'user')`);
                
                throw err;
            } finally {
                await connection.release();
            }
        })

    }
    static async save(user, userLogado) {
        let codigoCentro = user.codigoCentro == null ? null : `'${user.codigoCentro}'`;
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${user.dni}','${user.nombre}','${user.apellidos}','${user.correo}','${user.movil}','${user.direccion}','${user.password}','${user.genero}',${user.cp},'${user.rol}',STR_TO_DATE('${user.fechaNacimiento}','%Y-%m-%d'),${user.fpDual},${codigoCentro})`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido usuario con DNI ${user.dni} ','${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_USER','No se ha añadido el user con DNI ${user.dni}','${userLogado}',sysdate(), 'user')`);
           
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async deleteLogsByUser(dni, userLogado) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM logs WHERE usuario = ${dni}`;
            await connection.query(query);
            await connection.query(`DELETE FROM usuario WHERE dni = '${dni}'`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado usuario con DNI ${dni} ','${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_USER','No se ha borrado el usuario con DNI ${dni}','${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async deleteUser(dni, userLogado) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario WHERE dni = ${dni}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado usuario con DNI ${dni} ','${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_USER','No se ha borrado el usuario con DNI ${dni}','${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateUser(user, password, userLogado) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre='${user.nombre}',apellidos='${user.apellidos}',correo='${user.correo}', movil='${user.movil}',direccion='${user.direccion}',password='${password}',genero='${user.genero}', cp='${user.cp}',fechaNacimiento=STR_TO_DATE('${user.fechaNacimiento}','%Y-%m-%d') WHERE dni='${user.dni}'`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado usuario con DNI ${user.dni} ','${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_USER','No se ha actualizado el usuario con DNI ${user.dni}','${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async getUsersByCentro(codigoCentro) {
        return await promisePool.query(`SELECT usuario.*,rol.id, rol.nombreRol, fp_duales.nombre AS nombreFP, fp_duales.id, centro_educativo.codigoCentro, centro_educativo.nombre AS nombreCentro FROM usuario LEFT JOIN rol ON rol.id = usuario.rol LEFT JOIN fp_duales ON fp_duales.id = usuario.fpDual INNER JOIN centro_educativo ON centro_educativo.codigoCentro = usuario.codigoCentro AND usuario.codigoCentro = "${codigoCentro}"`);
    }
    static async getUsers() {
        return await promisePool.query('SELECT usuario.*,rol.id,  rol.nombreRol, fp_duales.nombre AS nombreFP, fp_duales.id, centro_educativo.codigoCentro, centro_educativo.nombre AS nombreCentro FROM usuario LEFT JOIN rol ON rol.id = usuario.rol LEFT JOIN fp_duales ON fp_duales.id = usuario.fpDual LEFT JOIN centro_educativo ON centro_educativo.codigoCentro = usuario.codigoCentro');
    }
};