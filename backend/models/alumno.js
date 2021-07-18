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
    static async findExpediente(numeroExpediente) {
        return await promisePool.query(
            `SELECT * FROM alumno where numeroExpediente = '${numeroExpediente}'`);
    }
    static async getAlumnos() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM alumno `);
        return rows;
    }
    static async getAlumno(dni) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM alumno WHERE dni='${dni}'`
        );
        return rows;
    }

    static async deleteAlumno(dni) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM alumno WHERE dni = '${dni}' `);
        return rows;
    }
    static async createAlumno(alumno, password) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, 
                fechaNacimiento, fpDual, codigoCentro) VALUES ('${alumno.dni}','${alumno.nombre}',
                '${alumno.apellidos}','${alumno.correo}','${alumno.movil}','${alumno.direccion}','${password}',
                '${alumno.genero}',${alumno.cp},'${alumno.rol}',STR_TO_DATE('${alumno.fechaNacimiento}','%Y-%m-%d'),
                '${alumno.fpDual}','${alumno.codigoCentro}')`
            await connection.query(query)
            await connection.query(`INSERT INTO alumno(dni, numeroExpediente) VALUES ('${alumno.dni}','${alumno.numeroExpediente}')`);
            let result=await  promisePool.query(`SELECT auto_increment FROM INFORMATION_SCHEMA.TABLES WHERE table_name = 'log_entidad'`);
            await connection.query(`INSERT INTO log_entidad(usuario,fechaHoraLog, DML, error) VALUES ('${alumno.dni}',sysdate(),'CREATE',0)`);
            //await connection.commit();
            var resultArray = JSON.parse(JSON.stringify(result[0]));
            console.log(resultArray[0].auto_increment)    
            console.log(`INSERT INTO log_usuario(idLog, usuario) VALUES (${resultArray[0].auto_increment} , '${alumno.dni}')`)
            await connection.query(`INSERT INTO log_usuario(idLog, usuario) VALUES (${resultArray[0].auto_increment} , '${alumno.dni}')`);

            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
   

};
