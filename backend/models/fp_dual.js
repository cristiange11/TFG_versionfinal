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
    static async DeleteCentroAndFPsByCentro(codigoCentro) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM fp_duales WHERE codigoCentro = '${codigoCentro}'`;
            await connection.query(query)
            await connection.query(`DELETE FROM centro_educativo WHERE codigoCentro =  '${codigoCentro}'`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
    }
    static async getFps() {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM fp_duales `);
        return rows;
    }
    static async deleteFp(id) {
        const [rows, fields] = await promisePool.query(
            `DELETE FROM fp_duales WHERE id = '${id}' `);
        return rows;
    }
    static async createFp(fp) {
        const [rows, fields] = await promisePool.query(
            `INSERT INTO fp_duales (nombre, descripcion, totalPlazas, anio, codigoCentro, plazasDisponibles) VALUES 
            ('${fp.nombre}','${fp.descripcion}','${fp.totalPlazas}','${fp.anio}','${fp.codigoCentro}',
            '${fp.plazasDisponibles}') `);
        return rows;
    }
    static async updateFp(fp) {
        const [rows, fields] = await promisePool.query(
            `UPDATE fp_duales SET nombre='${fp.nombre}',descripcion='${fp.descripcion}',totalPlazas='${fp.totalPlazas}'
            ,anio='${fp.anio}',codigoCentro='${fp.codigoCentro}',plazasDisponibles='${fp.plazasDisponibles}' 
            WHERE id = '${fp.id}' `);
        return rows;
    }

};