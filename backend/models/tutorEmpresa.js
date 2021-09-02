const promisePool = require('../util/database');

module.exports = class TutorEmpresa {
    constructor(dni, moduloEmpresa, cifEmpresa) {
        this.dni = dni;
        this.moduloEmpresa = moduloEmpresa;
        this.cifEmpresa = cifEmpresa;
    }
    //Método utilizado para comprobar si ya hay un tutor con ese DNI
    static async find(dni) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM tutor_empresa where dni = ${connection.escape(dni)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para obtener un listado de tutores
    static async getTutores() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT * FROM tutor_empresa `);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener un tutor
    static async getTutor(dni) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.*, T.idEmpresa AS idEmpresa, T.moduloEmpresa, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario as U, tutor_empresa as T, tutor_modulo as TM, modulo as M WHERE U.dni = T.dni AND T.dni=TM.dni AND M.codigo = TM.codigoModulo AND U.dni=${connection.escape(dni)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para obtener los tutores que enseñan en un módulo
    static async getTutorByModuloEncuesta(codigoModulo) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT U.* FROM usuario as U, modulo as M where U.rol=3 AND M.codigo = ${connection.escape(codigoModulo)}`);
        await connection.end();
        return rows;
    }
    //Método utilizado para eliminar un tutor
    static async deleteTutor(dni, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM tutor_empresa WHERE dni = ${connection.escape(dni)} `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha borrado tutor empresa con DNI " ${connection.escape(dni)},'${user}',sysdate(), 'tutor de empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_TUTOR',"No se ha borrado tutor empresa con DNI " ${connection.escape(dni)} ,'${user}',sysdate(), 'tutor de empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para crear un tutor
    static async createTutor(tutorEmpresa, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES (${connection.escape(tutorEmpresa.dni)},${connection.escape(tutorEmpresa.nombre)},${connection.escape(tutorEmpresa.apellidos)},${connection.escape(tutorEmpresa.correo)},${connection.escape(tutorEmpresa.movil)},${connection.escape(tutorEmpresa.direccion)},${connection.escape(password)},${connection.escape(tutorEmpresa.genero)},${connection.escape(tutorEmpresa.cp)},${connection.escape(tutorEmpresa.rol)},STR_TO_DATE(${connection.escape(tutorEmpresa.fechaNacimiento)},'%Y-%m-%d'),${connection.escape(tutorEmpresa.fpDual)},${connection.escape(tutorEmpresa.codigoCentro)})`;
            await connection.query(query);
            await connection.query(`INSERT INTO tutor_empresa (dni, moduloEmpresa, idEmpresa) VALUES (${connection.escape(tutorEmpresa.dni)},${connection.escape(tutorEmpresa.moduloEmpresa)}, ${connection.escape(tutorEmpresa.idEmpresa)})`);
            const tutor = JSON.parse(JSON.stringify(tutorEmpresa.modulo.modulo));
            for (var i = 0; i < tutor.length; i++) {
                const moduloInser = tutor[i];
                await connection.query(`INSERT INTO tutor_modulo (codigoModulo, dni) SELECT modulo.codigo, tutor_empresa.dni FROM modulo, tutor_empresa WHERE modulo.codigo = ${connection.escape(moduloInser)} AND tutor_empresa.dni=${connection.escape(tutorEmpresa.dni)}`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido tutor empresa con DNI " ${connection.escape(tutorEmpresa.dni)} ,'${user}',sysdate(), 'tutor de empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_TUTOR',"No se ha añadido tutor empresa con DNI " ${connection.escape(tutorEmpresa.dni)} ,'${user}',sysdate(), 'tutor de empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método utilizado para actualizar un tutor
    static async updateTutor(tutor, password, user) {
        const connection = await promisePool.connection().getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre=${connection.escape(tutor.nombre)},apellidos=${connection.escape(tutor.apellidos)},correo=${connection.escape(tutor.correo)}, movil=${connection.escape(tutor.movil)},direccion=${connection.escape(tutor.direccion)},password=${connection.escape(password)},genero=${connection.escape(tutor.genero)}, cp=${connection.escape(tutor.cp)},fechaNacimiento=STR_TO_DATE(${connection.escape(tutor.fechaNacimiento)},'%Y-%m-%d') WHERE dni=${connection.escape(tutor.dni)}`;
            await connection.query(query);
            await connection.query(`UPDATE tutor_empresa SET moduloEmpresa=${connection.escape(tutor.moduloEmpresa)} WHERE dni = ${connection.escape(tutor.dni)}`);
            await connection.query(`DELETE  FROM tutor_modulo WHERE DNI = ${connection.escape(tutor.dni)}`);
            const tutorModulo = JSON.parse(JSON.stringify(tutor.modulo.modulo));
            for (var i = 0; i < tutorModulo.length; i++) {
                const moduloInser = tutorModulo[i];
                await connection.query(`INSERT INTO tutor_modulo (codigoModulo, dni) SELECT modulo.codigo, tutor_empresa.dni FROM modulo, tutor_empresa WHERE modulo.codigo = ${connection.escape(moduloInser)} AND tutor_empresa.dni=${connection.escape(tutor.dni)}`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado tutor empresa con DNI " ${connection.escape(tutor.dni)} ,'${user}',sysdate(), 'tutor de empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_TUTOR',"No se ha actualizado tutor empresa con DNI " ${connection.escape(tutor.dni)},'${user}',sysdate(), 'tutor de empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
};