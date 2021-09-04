const promisePool = require('../util/database');
const FP = require('./fpDual');
module.exports = class Modulo {
    constructor(codigo, nombre, descripcion, curso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }
    //Método para buscar un módulo
    static async find(codigo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM modulo where codigo = ${connection.escape(codigo)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener un listado de módulos asociados a un FP dual
    static async getModulos(fpDual) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(
            `SELECT * FROM modulo where fpDual = ${connection.escape(fpDual)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener toda la información de un módulo
    static async getModulo(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM modulo where codigo = ${connection.escape(codigoModulo)}`);
        await connection.end();
        return rows;
    }
    //Método para obtener los módulos del profesor
    static async getModulosProf(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT M.* FROM modulo M, profesor_modulo PM, profesor P WHERE P.dni = PM.dni AND PM.codigoModulo = M.codigo AND P.dni = ${connection.escape(dni)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener los módulos del tutor
    static async getModulosTut(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT M.* FROM modulo M, tutor_modulo TM, tutor_empresa T WHERE T.dni = TM.dni AND TM.codigoModulo = M.codigo AND T.dni = ${connection.escape(dni)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener los módulos del alumno
    static async getModulosAlum(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT M.* FROM modulo as M, alumno_modulo as AM, alumno as A WHERE A.dni = AM.dni AND AM.codigoModulo = M.codigo AND A.dni = ${connection.escape(dni)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener un lsitado de los módulos que el alumno aún no ha aprobado
    static async getModulosAlumUpdate(dni, fpDual) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.*, M.nombre as nombreModulo, M.codigo as codigoModulo, A.numeroExpediente, C.nota FROM alumno as A, usuario as U, modulo as M left join calificacion as C on C.codigoModulo = M.codigo AND C.dni = ${connection.escape(dni)} where U.rol=5 AND U.dni=${connection.escape(dni)} AND M.fpDual =${connection.escape(fpDual)}  AND A.dni = U.dni  AND C.nota is NULL or C.nota < 5`);
        await connection.end();
        return rows;
    }
    //Método para eliminar un módulo
    static async deleteModulo(codigo, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM modulo WHERE codigo =  ${connection.escape(codigo)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null}, "Se ha eliminado el módulo " ${connection.escape(codigo)} ,'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_MODULO','No se ha podido eliminar el módulo ' ,'${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    //Método para eliminar todo lo asociado a un módulo
    static async deleteAllByModulo(codigo, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM calificacion WHERE codigoModulo =  ${connection.escape(codigo)}`;
            await connection.query(query);
            await connection.query(`DELETE FROM resultado_aprendizaje WHERE codigoModulo =  ${connection.escape(codigo)}`);
            await connection.query(`DELETE FROM encuesta WHERE codigoModulo =  ${connection.escape(codigo)}`);
            await connection.query(`DELETE FROM modulo WHERE codigo =  ${connection.escape(codigo)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null}, "Se ha eliminado el módulo "  ${connection.escape(codigo)} ,'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_MODULO','No se ha podido eliminar el módulo ' ,'${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para crear un módulo
    static async createModulo(modulo, user) {
        const connection = await promisePool.connection().getConnection();
        const fp = await FP.getFp(modulo.fpDual);
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO modulo(nombre, descripcion, curso, fpDual) VALUES (${connection.escape(modulo.nombre)},${connection.escape(modulo.descripcion)},${connection.escape(modulo.curso)}, ${connection.escape(modulo.fpDual)}) `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha creado el modulo con nombre  " ${connection.escape(modulo.nombre)} " del FP " ${connection.escape(fp[0].nombre)} ,'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_MODULO',"No se ha añadido modulo con el nombre " ${connection.escape(modulo.nombre)} " del FP " ${connection.escape(fp[0].nombre)},'${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para actualizar un módulo
    static async updateModulo(modulo, user) {
        const connection = await promisePool.connection().getConnection();
        const fp = await FP.getFp(modulo.fpDual);
        try {
            await connection.beginTransaction();
            let query = `UPDATE modulo SET nombre=${connection.escape(modulo.nombre)}, descripcion=${connection.escape(modulo.descripcion)},curso=${connection.escape(modulo.curso)}, fpDual = ${connection.escape(modulo.fpDual)} WHERE codigo = ${connection.escape(modulo.codigo)}`;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado el modulo " ${connection.escape(modulo.nombre)} " del FP " ${connection.escape(fp[0].nombre)},'${user}',sysdate(), 'modulo')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_MODULO',"No se ha actualizado el modulo  "${connection.escape(modulo.nombre)} " del FP " ${connection.escape(fp[0].nombre)},'${user}',sysdate(), 'modulo')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
};