const promisePool = require('../util/database');

module.exports = class FP_dual {
    constructor(nombre, descripcion, total_plazas, anio, codigo_centro, plazas_disponibles) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.total_plazas = total_plazas;
        this.anio = anio;
        this.codigo_centro = codigo_centro;
        this.plazas_disponibles = plazas_disponibles;
    }
    static async getNombreFPByCentro(codigoCentro) {

        const [rows, fields] = await promisePool.query(
            `SELECT F.id, F.nombre FROM fp_duales as F, centro_educativo as C WHERE C.codigo_centro=F.codigo_centro and C.codigo_centro='${codigoCentro}'  `);

        return rows;
    }
    static async DeleteCentroAndFPsByCentro(codigoCentro) {
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            let query = `DELETE FROM fp_duales WHERE codigo_centro = '${codigoCentro}'`;
            await connection.query(query)
            await connection.query(`DELETE FROM centro_educativo WHERE codigo_centro =  '${codigoCentro}'`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            console.log('ROLLBACK', err);
            throw err;
        } finally {
            await connection.release();
        }
    }

};