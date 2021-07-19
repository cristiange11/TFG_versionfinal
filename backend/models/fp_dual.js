const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(nombre, descripcion, totalPlazas, anio, codigoCentro, plazasDisponibles) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.totalPlazas = totalPlazas;
        this.anio = anio;
        this.codigoCentro = codigoCentro;
        this.plazasDisponibles = plazasDisponibles;
    }
    static async getNombreFPByCentro(codigoCentro) {

        const [rows, fields] = await promisePool.query(
            `SELECT F.id, F.nombre FROM fp_duales as F, centro_educativo as C WHERE C.codigoCentro=F.codigoCentro and C.codigoCentro='${codigoCentro}'  `);

        return rows;
    }
    static async DeleteUsuariosByFP(fpDual , user) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM usuario WHERE fpDual = '${fpDual}'`;
            await connection.query(query)
            await connection.query(`DELETE FROM fp_dual WHERE id =  '${fpDual}'`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado el FP ${fp.id} y todo lo asociado','${user}',sysdate(), 'FP')`);  
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_FP','No Se ha borrado el FP ${fp.id}','${user}',sysdate(), 'FP')`);  
            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async getFp(id) {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM fp_duales id = '${id}'`);
        return rows;
    }
    static async getFps() {
        console.log("entro a obtener los fps con la consulta")
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM fp_duales `);
        return rows;
    }
    static async deleteFp(id,user) {
        const connection = await promisePool.getConnection();
        console.log("entro a")
        try {
            await connection.beginTransaction();
            let query =  `DELETE FROM fp_duales WHERE id = '${id}' `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha borrado el FP ${fp.id}','${user}',sysdate(), 'FP')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_FP','No se ha borrado el FP ${fp.id} ','${user}',sysdate(), 'FP')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createFp(fp, user ) {
        const connection = await promisePool.getConnection();
        console.log("entro a")
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO fp_duales (nombre, descripcion, totalPlazas, anio, codigoCentro, plazasDisponibles) VALUES ('${fp.nombre}','${fp.descripcion}','${fp.totalPlazas}','${fp.anio}','${fp.codigoCentro}','${fp.plazasDisponibles}') `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido FP ','${user}',sysdate(), 'FP')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_FP','No se ha añadido FP con ','${user}',sysdate(), 'FP')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
       
    }
    static async updateFp(fp,user) {
        const connection = await promisePool.getConnection();
        console.log("entro a")
        try {
            await connection.beginTransaction();
            let query =  `UPDATE fp_duales SET nombre='${fp.nombre}',descripcion='${fp.descripcion}',totalPlazas='${fp.totalPlazas}' ,anio='${fp.anio}',codigoCentro='${fp.codigoCentro}',plazasDisponibles='${fp.plazasDisponibles}' WHERE id = '${fp.id}' `;
            await connection.query(query)
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualiza el FP ${fp.id}','${user}',sysdate(), 'FP')`);            
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_FP','No se ha actualizado FP ${fp.id} ','${user}',sysdate(), 'FP')`);            
            console.log('ROLLBACK at querySignUp', err);
            throw err;
        } finally {
            await connection.release();
        }
        
    }

};