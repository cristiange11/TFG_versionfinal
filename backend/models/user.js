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
    //Método utilizado para comprobar si existe un usuario ya creado
    static async find(dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM usuario where dni = ${connection.escape(dni)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para comprobar que las contraseñas sean iguales
    static async comparePassword(password, password2) {
        return await bcrypt.compare(password, password2);
    }
    //Método utilizado para obtener el usuario a través del correo introducido
    static async getUser(correo) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM usuario where correo =${connection.escape(correo)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para comprobar que no exista un usuario que no sea el introducido y  que tenga el móvil introducido
    static async findMovil(movil, dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM usuario where movil =${connection.escape(movil)} AND dni !=${connection.escape(dni)}`);
        await connection.end();
        return res;
    }
    //Método que sirve para comprobar si el móvil introducido pertenece a un usuario
    static async findMovilCreate(movil) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM usuario where movil =${connection.escape(movil)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para comprobar que no exista un usuario que no sea el introducido y que tenga el correo añadido
    static async findCorreo(correo, dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM usuario where correo =${connection.escape(correo)} AND dni !=${connection.escape(dni)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para actualizar la contraseña del usuario
    static async updatePassword(correo, password) {
        this.getUser(correo).then(async function (resultado) {
            var cadena = JSON.stringify(resultado[0])
            var resJSON = JSON.parse(cadena)
            var dni = resJSON[0]['dni'];
            const connection = await promisePool.connection().getConnection();
            try {
                await connection.beginTransaction();
                let query = `UPDATE usuario SET password = ${connection.escape(password)} WHERE correo=${connection.escape(correo)}`;
                await connection.query(query)
                await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'El usuario con DNI ${dni} ha actualizado su contraseña ','${dni}',sysdate(), 'user')`);
                await connection.commit();
            } catch (err) {
                await connection.query("ROLLBACK");
                await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_USER','El usuario con DNI ${dni} no ha actualizado su contraseña','${resultado.dni}',sysdate(), 'user')`);
                throw err;
            } finally {
                await connection.release();
            }
        })
    }
    //Método utilizado para crear un usuario
    static async save(user, userLogado) {
        let codigoCentro = user.codigoCentro == null ? null : user.codigoCentro;
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            var sql = 'INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES (' + connection.escape(user.dni) + ',' + connection.escape(user.nombre) + ',' + connection.escape(user.apellidos) + ',' + connection.escape(user.correo) + ',' + connection.escape(user.movil) + ',' + connection.escape(user.direccion) + ',' + connection.escape(user.password) + ',' + connection.escape(user.genero) + ',' + connection.escape(user.cp) + ',' + connection.escape(user.rol) + ',STR_TO_DATE(' + connection.escape(user.fechaNacimiento) + ',"%Y-%m-%d"),' + connection.escape(user.fpDual) + ',' + connection.escape(codigoCentro) + ')';
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${connection.escape(user.dni)}','${connection.escape(user.nombre)}','${connection.escape(user.apellidos)}','${connection.escape(user.correo)}','${connection.escape(user.movil)}','${connection.escape(user.direccion)}','${connection.escape(user.password)}','${connection.escape(user.genero)}',${connection.escape(user.cp)},'${connection.escape(user.rol)}',STR_TO_DATE('${connection.escape(user.fechaNacimiento)}','%Y-%m-%d'),${connection.escape(user.fp)},${codigoCentro})`;
            await connection.query(sql)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido usuario con DNI " ${connection.escape(user.dni)} ,'${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_USER',"No se ha añadido el user con DNI " ${connection.escape(user.dni)},'${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para eliminar todo lo asociado al usuario
    static async deleteLogsByUser(dni, userLogado) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM logs WHERE usuario = ${connection.escape(dni)}`;
            await connection.query(query);
            await connection.query(`DELETE FROM encuesta WHERE dniTutoroAdmin = ${connection.escape(dni)}`);
            await connection.query(`DELETE FROM calificacion WHERE dni = ${connection.escape(dni)}`);
            await connection.query(`DELETE FROM usuario WHERE dni = ${connection.escape(dni)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado usuario con DNI " ${connection.escape(dni)} ,'${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_USER',"No se ha borrado el usuario con DNI " ${connection.escape(dni)},'${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para eliminar un usuario
    static async deleteUser(dni, userLogado) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario WHERE dni = ${connection.escape(dni)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado usuario con DNI " ${connection.escape(dni)},'${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_USER',"No se ha borrado el usuario con DNI " ${connection.escape(dni)},'${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para actualizar un usuario
    static async updateUser(user, password, userLogado) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre=${connection.escape(user.nombre)},apellidos=${connection.escape(user.apellidos)},correo=${connection.escape(user.correo)}, movil=${connection.escape(user.movil)},direccion=${connection.escape(user.direccion)},password=${connection.escape(password)},genero=${connection.escape(user.genero)}, cp=${connection.escape(user.cp)},fechaNacimiento=STR_TO_DATE(${connection.escape(user.fechaNacimiento)},'%Y-%m-%d') WHERE dni=${connection.escape(user.dni)}`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado usuario con DNI  " ${connection.escape(user.dni)},'${userLogado}',sysdate(), 'user')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_USER',"No se ha actualizado el usuario con DNI " ${connection.escape(user.dni)},'${userLogado}',sysdate(), 'user')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para obtener un listado de usuarios asociados a un centro
    static async getUsersByCentro(codigoCentro) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT usuario.*,rol.id, rol.nombreRol, fp_duales.nombre AS nombreFP, fp_duales.id, centro_educativo.codigoCentro, centro_educativo.nombre AS nombreCentro FROM usuario LEFT JOIN rol ON rol.id = usuario.rol LEFT JOIN fp_duales ON fp_duales.id = usuario.fpDual INNER JOIN centro_educativo ON centro_educativo.codigoCentro = usuario.codigoCentro AND usuario.codigoCentro = ${connection.escape(codigoCentro)}`);
        await connection.end();
        return res;
    }
    //Método que sirve para obtener un listado de todos los usuarios
    static async getUsers() {
        const connection = await promisePool.connection();
        const res = await connection.query('SELECT usuario.*,rol.id,  rol.nombreRol, fp_duales.nombre AS nombreFP, fp_duales.id, centro_educativo.codigoCentro, centro_educativo.nombre AS nombreCentro FROM usuario LEFT JOIN rol ON rol.id = usuario.rol LEFT JOIN fp_duales ON fp_duales.id = usuario.fpDual LEFT JOIN centro_educativo ON centro_educativo.codigoCentro = usuario.codigoCentro');
        await connection.end();
        return res;
    }
};