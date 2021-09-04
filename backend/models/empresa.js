const promisePool = require('../util/database');
const Centro = require('./centro');
module.exports = class Empresa {
    constructor(cifEmpresaEmpresa, direccion, nombre, tipo, correo, telefono, url) {
        this.cifEmpresaEmpresa = cifEmpresaEmpresa;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.correo = correo;
        this.telefono = telefono;
        this.url = url;
    }
    //Método utilizado para comprobar que el teléfono introducido no pertenece a ninguna empresa ya creada
    static async findTelefono(telefono, cifEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM empresa where telefono = ${connection.escape(telefono)} AND cifEmpresa != ${connection.escape(cifEmpresa)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para comprobar que el correo introducido no pertenece a ninguna empresa ya creada
    static async findCorreo(correo, cifEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM empresa where correo = ${connection.escape(correo)} AND cifEmpresa != ${connection.escape(cifEmpresa)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para obtener la empresa
    static async find(idEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM empresa where id =${connection.escape(idEmpresa)}`);
        await connection.end();
        return res;
    }
    //Método utilizado para obtener un listado de las empresas
    static async getEmpresas() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id `);
        await connection.end();
        return rows;
    }
    //Método para obtener un listado de las empresas asociadas a un centro
    static async getEmpresasByCentro(codigoCentro) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as becas, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id AND F.codigoCentro = ${connection.escape(codigoCentro)}`);
        await connection.end();
        return rows;
    }
    //Método para conocer a qué FP y centro está asociada la empresa
    static async getFpAndCentroByEmpresa(idEmpresa) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT FP.nombre AS nombreFP, C.nombre as nombreCentro FROM fp_duales as FP, empresa as E, empresa_fpdual as EP, centro_educativo as C where E.id = EP.idEmpresa AND EP.idFp = FP.id AND E.id = ${connection.escape(idEmpresa)} and C.codigoCentro = E.codigoCentro`);
        await connection.end();
        return rows;
    }
    //Método para obtener las empresas asociados a un FP dual
    static async getEmpresasByFp(fpDual) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.* FROM empresa E, fp_duales F, empresa_fpdual FE WHERE E.id = FE.idEmpresa AND FE.idFp = F.id AND F.id = ${connection.escape(fpDual)}`);
        await connection.end();
        return rows;
    }
    //Método para eliminar una empresa
    static async deleteEmpresa(id, user) {
        const connection = await promisePool.connection().getConnection();
        const empresa = await this.find(idEmpresa);
        try {
            await connection.beginTransaction();
            await connection.query(`DELETE FROM empresa_fpdual where idEmpresa = ${connection.escape(idEmpresa)}`);
            let query = `DELETE FROM empresa WHERE id  =  ${connection.escape(id)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha eliminado  la empresa " ${connection.escape(empresa[0][0].nombre)} ,'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK" + err);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA',"No se ha podido eliminar la empresa " ${connection.escape(id)} ,'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para borrar todo lo asociado a la empresa
    static async deleteTutorEmpresaByEmpresa(idEmpresa, user) {
        const connection = await promisePool.connection().getConnection();
        const empresa = await this.find(idEmpresa);
        try {
            await connection.beginTransaction();
            await connection.query(`DELETE t1 FROM encuesta t1 INNER JOIN tutor_empresa t2 ON ( t1.dniTutoroAdmin = t2.dni) WHERE t2.idEmpresa = ${connection.escape(idEmpresa)}`);
            await connection.query(`DELETE t2 FROM tutor_empresa t1 JOIN logs t2 ON t2.usuario = t1.dni WHERE t1.idEmpresa = ${connection.escape(idEmpresa)}`);
            let query = `DELETE t1 FROM usuario t1 INNER JOIN tutor_empresa t2 ON ( t1.dni = t2.dni) WHERE t2.idEmpresa = ${connection.escape(idEmpresa)}`;
            await connection.query(query);
            await connection.query(`DELETE FROM empresa_fpdual where idEmpresa = ${connection.escape(idEmpresa)}`);
            await connection.query(`DELETE FROM empresa WHERE id =  ${connection.escape(idEmpresa)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha eliminado todo lo asociado a la empresa "  ${connection.escape(empresa[0][0].nombre)}  ,'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA',"No se ha podido eliminar la empresa "  ,'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para crear una empresa
    static async createEmpresa(empresa, user) {
        const connection = await promisePool.connection().getConnection();
        let centro = await Centro.getCentro(empresa.codigoCentro)
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO empresa(cifEmpresa, direccion, nombre, correo, telefono, url, codigoCentro) VALUES ( ${connection.escape(empresa.cifEmpresa)},${connection.escape(empresa.direccion)},${connection.escape(empresa.nombre)},${connection.escape(empresa.correo)},${connection.escape(empresa.telefono)},${connection.escape(empresa.url)}, ${connection.escape(empresa.codigoCentro)}) `;
            await connection.query(query)
            let id = await connection.query(`SELECT MAX(id) AS id FROM empresa`);
            const idEmpresa = JSON.parse(JSON.stringify(id));
            idEmpresa[0].forEach(element => {
                id = element.id
            });
            await connection.query(`INSERT INTO empresa_fpdual(idFp, idEmpresa, becas, plazas, dineroBeca) VALUES (${connection.escape(empresa.fpDual)},${id},${connection.escape(empresa.becas)},${connection.escape(empresa.plazas)}, ${connection.escape(empresa.dineroBeca)})`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido empresa con CIF " ${connection.escape(empresa.cifEmpresa)} " con relación al centro " ${connection.escape(centro[0].nombre)} ,'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK " + err);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_EMPRESA',"No se ha añadido empresa con CIF " ${connection.escape(empresa.cifEmpresa)} " con relación al centro " ${connection.escape(centro[0].nombre)},'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
    //Método para actualizar una empresa
    static async updateEmpresa(empresa, user) {
        const connection = await promisePool.connection().getConnection();
        let centroAndFp = await this.getFpAndCentroByEmpresa(empresa.id);
        let centro = centroAndFp[0].nombreCentro
        try {
            await connection.beginTransaction();
            let query = `UPDATE empresa SET direccion=${connection.escape(empresa.direccion)},nombre=${connection.escape(empresa.nombre)}, correo=${connection.escape(empresa.correo)},telefono=${connection.escape(empresa.telefono)},url=${connection.escape(empresa.url)} WHERE id = ${connection.escape(empresa.id)}`;
            await connection.query(query)
            await connection.query(`UPDATE empresa_fpdual SET becas=${connection.escape(empresa.becas)} ,plazas=${connection.escape(empresa.plazas)}, dineroBeca = ${connection.escape(empresa.dineroBeca)} WHERE idEmpresa = ${connection.escape(empresa.id)} `);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado empresa con CIF " ${connection.escape(empresa.cifEmpresa)} " con relación al centro " ${connection.escape(centro)},'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_EMPRESA',"No se ha actualizado empresa con CIF " ${connection.escape(empresa.cifEmpresa)} " con relación al centro " ${connection.escape(centro)},'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }
    }
};