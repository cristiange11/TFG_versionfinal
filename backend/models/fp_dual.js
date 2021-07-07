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
    static async getNombreFPByCentro(codigo_centro) {

        const [rows, fields] = await promisePool.query(
            `SELECT F.id, F.nombre FROM fp_duales as F, centro_educativo as C WHERE C.codigo_centro=F.codigo_centro and C.codigo_centro='${codigo_centro}'  `);

        return rows;
    }


};