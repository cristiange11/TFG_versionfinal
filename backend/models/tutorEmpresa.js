const promisePool = require('../util/database');

module.exports = class TutorEmpresa {
    constructor(dni, moduloEmpresa, cifEmpresa) {
        this.dni = dni;
        this.moduloEmpresa = moduloEmpresa;
        this.cifEmpresa = cifEmpresa;
    }
    static async find(dni) {
        return await promisePool.query(
            `SELECT * FROM tutor_empresa where dni = '${dni}'`);
    }
    static async getTutores() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM tutor_empresa `);
        return rows;
    }
    static async getTutor(dni) {
        
        const [rows, fields] = await promisePool.query(`SELECT U.*, T.cifEmpresa AS CIF, T.moduloEmpresa, M.nombre as nombreModulo, M.codigo as moduloCodigo FROM usuario U, tutor_empresa T, tutor_modulo TM, modulo M WHERE U.dni = T.dni AND T.dni=TM.dni AND M.codigo = TM.codigoModulo AND U.dni='${dni}'`);
        return rows;
    }
    static async deleteTutor(dni,user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query =  `DELETE FROM tutor_empresa WHERE dni = '${dni}' `;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado tutor empresa con DNI ${dni} ','${user}',sysdate(), 'tutor de empresa')`);            

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_TUTOR','No se ha borrado tutor empresa con DNI ${dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    static async createTutor(tutorEmpresa, password, user) {

        const connection = await promisePool.getConnection();
        console.log(tutorEmpresa.modulo.modulo)
        console.log(`INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${tutorEmpresa.dni}','${tutorEmpresa.nombre}','${tutorEmpresa.apellidos}','${tutorEmpresa.correo}','${tutorEmpresa.movil}','${tutorEmpresa.direccion}','${password}','${tutorEmpresa.genero}',${tutorEmpresa.cp},'${tutorEmpresa.rol}',STR_TO_DATE('${tutorEmpresa.fechaNacimiento}','%Y-%m-%d'),'${tutorEmpresa.fpDual}','${tutorEmpresa.codigoCentro}')`);
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fechaNacimiento, fpDual, codigoCentro) VALUES ('${tutorEmpresa.dni}','${tutorEmpresa.nombre}','${tutorEmpresa.apellidos}','${tutorEmpresa.correo}','${tutorEmpresa.movil}','${tutorEmpresa.direccion}','${password}','${tutorEmpresa.genero}',${tutorEmpresa.cp},'${tutorEmpresa.rol}',STR_TO_DATE('${tutorEmpresa.fechaNacimiento}','%Y-%m-%d'),'${tutorEmpresa.fpDual}','${tutorEmpresa.codigoCentro}')`;
            await connection.query(query);
            await connection.query(`INSERT INTO tutor_empresa (dni, moduloEmpresa, cifEmpresa) VALUES ('${tutorEmpresa.dni}','${tutorEmpresa.moduloEmpresa}', '${tutorEmpresa.cifEmpresa}')`);
            const tutor = JSON.parse(JSON.stringify(tutorEmpresa.modulo.modulo));

            for (var i = 0; i < tutor.length; i++) {

                const moduloInser = tutor[i];

                await connection.query(`INSERT INTO tutor_modulo (codigoModulo, dni) SELECT modulo.codigo, tutor_empresa.dni FROM modulo, tutor_empresa WHERE modulo.codigo = ${moduloInser} AND tutor_empresa.dni='${tutorEmpresa.dni}'`);
            }
            
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido tutor empresa con DNI ${tutorEmpresa.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_TUTOR','No se ha añadido tutor empresa con DNI ${tutorEmpresa.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async updateTutor(tutor,password, user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `UPDATE usuario SET nombre='${tutor.nombre}',apellidos='${tutor.apellidos}',correo='${tutor.correo}', movil='${tutor.movil}',direccion='${tutor.direccion}',password='${password}',genero='${tutor.genero}', cp='${tutor.cp}',rol='${tutor.rol}',fechaNacimiento=STR_TO_DATE('${tutor.fechaNacimiento}','%Y-%m-%d'),fpDual=${tutor.fpDual},codigoCentro='${tutor.codigoCentro}' WHERE dni='${tutor.dni}'`;
            await connection.query(query);
            await connection.query(`UPDATE tutor_empresa SET moduloEmpresa='${tutor.moduloEmpresa}' WHERE dni = '${tutor.dni}'`);
            await connection.query(`DELETE  FROM tutor_modulo WHERE DNI = '${tutor.dni}'`);
            const tutorModulo = JSON.parse(JSON.stringify(tutor.modulo.modulo));

            for (var i = 0; i < tutorModulo.length; i++) {

                const moduloInser = tutorModulo[i];

                await connection.query(`INSERT INTO tutor_modulo (codigoModulo, dni) SELECT modulo.codigo, tutor_empresa.dni FROM modulo, tutor_empresa WHERE modulo.codigo = ${moduloInser} AND tutor_empresa.dni='${tutor.dni}'`);
            }
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado tutor empresa con DNI ${tutor.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_TUTOR','No se ha actualizado tutor empresa con DNI ${tutor.dni} ','${user}',sysdate(), 'tutor de empresa')`);            
            throw err;
        } finally {
            await connection.release();
        }
        
    }
    
};