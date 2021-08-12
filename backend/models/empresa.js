const promisePool = require('../util/database');

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
    static async findTelefono(telefono, cifEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM empresa where telefono = ${connection.escape(telefono)} AND cifEmpresa != ${connection.escape(cifEmpresa)}`);
        await connection.end();
        return res;
    }
    static async findCorreo(correo, cifEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(`SELECT * FROM empresa where correo = ${connection.escape(correo)} AND cifEmpresa != ${connection.escape(cifEmpresa)}`);
        await connection.end();
        return res;
    }
    static async find(idEmpresa) {
        const connection = await promisePool.connection();
        const res = await connection.query(
            `SELECT * FROM empresa where id =${connection.escape(idEmpresa)}`);
        await connection.end();
        return res;
    }
    static async getEmpresas() {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id `);
        await connection.end();
        return rows;
    }
    static async getEmpresasByCentro(codigoCentro) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id AND F.codigoCentro = ${connection.escape(codigoCentro)}`);
        await connection.end();
        return rows;
    }
    static async getFpAndCentroByEmpresa(idEmpresa) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT FP.nombre AS nombreFP, C.nombre as nombreCentro FROM fp_duales as FP, empresa as E, empresa_fpdual as EP, centro_educativo as C where E.id = EP.idEmpresa AND EP.idFp = FP.id AND E.id = ${connection.escape(idEmpresa)} and C.codigoCentro = E.codigoCentro`);
        await connection.end();
        return rows;
    }
    
    static async getEmpresasByFp(fpDual) {
        const connection = await promisePool.connection();
        const [rows, fields] = await connection.query(`SELECT E.* FROM empresa E, fp_duales F, empresa_fpdual FE WHERE E.id = FE.idEmpresa AND FE.idFp = F.id AND F.id = ${connection.escape(fpDual)}`);
        await connection.end();
        return rows;
    }
    static async deleteEmpresa(id, user) {
        const connection = await promisePool.getConnection();
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM empresa WHERE id  =  ${connection.escape(id)}`;
            await connection.query(query);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado  la empresa ' ,'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK" + err);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA','No se ha podido eliminar la empresa ' ,'${user}',sysdate(), 'empresa')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async deleteTutorEmpresaByEmpresa(idEmpresa, user) {
        const connection = await promisePool.connection().getConnection();       
        try {
            await connection.beginTransaction();
            let query = `DELETE t1 FROM usuario t1 INNER JOIN tutor_empresa t2 ON ( t1.dni = t2.dni) WHERE t2.idEmpresa = ${connection.escape(idEmpresa)}`;
            await connection.query(query);
            await connection.query(`DELETE FROM empresa_fpdual where idEmpresa = ${connection.escape(idEmpresa)}`);
            await connection.query(`DELETE FROM empresa WHERE id =  ${connection.escape(idEmpresa)}`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha eliminado todo lo asociado a la empresa ' ,'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_DELETE_EMPRESA','No se ha podido eliminar la empresa ' ,'${user}',sysdate(), 'empresa')`);

            throw err;
        } finally {
            await connection.release();
        }

    }
    static async createEmpresa(empresa, user) {
        const connection = await promisePool.connection().getConnection();       
        
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
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha añadido empresa con CIF ${connection.escape(empresa.cifEmpresaEmpresa)} ",'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK " + err);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_EMPRESA',"No se ha añadido empresa con CIF ${connection.escape(empresa.cifEmpresaEmpresa)}",'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateEmpresa(empresa, user) {
        const connection = await promisePool.connection().getConnection();       
        try {
            await connection.beginTransaction();
            let query = `UPDATE empresa SET direccion=${connection.escape(empresa.direccion)},nombre=${connection.escape(empresa.nombre)}, correo=${connection.escape(empresa.correo)},telefono=${connection.escape(empresa.telefono)},url=${connection.escape(empresa.url)} WHERE id = ${connection.escape(empresa.id)}`;
            await connection.query(query)
            await connection.query(`UPDATE empresa_fpdual SET becas=${connection.escape(empresa.becas)} ,plazas=${connection.escape(empresa.plazas)}, dineroBeca = ${connection.escape(empresa.dineroBeca)} WHERE idEmpresa = ${connection.escape(empresa.id)} `);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},"Se ha actualizado empresa con CIF ${connection.escape(empresa.cifEmpresa)} ",'${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_EMPRESA',"No se ha actualizado empresa con CIF ${connection.escape(empresa.cifEmpresa)}",'${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
};