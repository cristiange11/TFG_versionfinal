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
        return await promisePool.query(
            `SELECT * FROM empresa where telefono = '${telefono}' AND cifEmpresa != '${cifEmpresa}'`);
    }
    static async findCorreo(correo, cifEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where correo = '${correo}' AND cifEmpresa != '${cifEmpresa}'`);
    }
    static async find(idEmpresa) {
        return await promisePool.query(
            `SELECT * FROM empresa where id =${idEmpresa}`);
    }
    static async getEmpresas() {
        console.log(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id `)
        const [rows, fields] = await promisePool.query(
            `SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id `);
        return rows;
    }
    static async getEmpresasByCentro(codigoCentro) {
        console.log(`SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id AND F.codigoCentro = "${codigoCentro}"`)
        const [rows, fields] = await promisePool.query(
            `SELECT E.*, EF.dineroBeca AS dineroBeca,EF.becas as beca, EF.plazas AS plazas, F.nombre as nombreFp, F.id as idFp FROM empresa E, empresa_fpdual EF, fp_duales F where E.id = EF.idEmpresa and EF.idFp=F.id AND F.codigoCentro = "${codigoCentro}"`);
        return rows;
    }
    static async getEmpresasByFp(fpDual) {
        const [rows, fields] = await promisePool.query(
            `SELECT E.* FROM empresa E, fp_duales F, empresa_fpdual FE WHERE E.id = FE.idEmpresa AND FE.idFp = F.id AND F.id = ${fpDual}`);
        return rows;
    }
    static async deleteEmpresa(id, user) {
        const connection = await promisePool.getConnection();
        console.log("ENTRO A BORRAR " + `DELETE FROM empresa WHERE empresa.id  =  ${id}`)
        try {
            await connection.beginTransaction();
            let query = `DELETE FROM empresa WHERE id  =  ${id}`;
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
        const connection = await promisePool.getConnection();
        console.log("entro en la segunda")
        try {
            await connection.beginTransaction();
            let query = `DELETE t1 FROM usuario t1 INNER JOIN tutor_empresa t2 ON ( t1.dni = t2.dni) WHERE t2.idEmpresa = ${idEmpresa}`;
            await connection.query(query);
            await connection.query(`DELETE FROM empresa_fpdual where idEmpresa = ${idEmpresa}`);
            await connection.query(`DELETE FROM empresa WHERE id =  ${idEmpresa}`);
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
        const connection = await promisePool.getConnection();
         
        try {
            await connection.beginTransaction();
            let query = `INSERT INTO empresa(cifEmpresa, direccion, nombre, correo, telefono, url, codigoCentro) VALUES ('${empresa.cifEmpresa}','${empresa.direccion}','${empresa.nombre}','${empresa.correo}','${empresa.telefono}','${empresa.url}', '${empresa.codigoCentro}') `;
            await connection.query(query)
            let id =await connection.query(`SELECT MAX(id) AS id FROM empresa`);
            const idEmpresa = JSON.parse(JSON.stringify(id));
            idEmpresa[0].forEach(element => {
                id = element.id
            });  
            await connection.query(`INSERT INTO empresa_fpdual(idFp, idEmpresa, becas, plazas, dineroBeca) VALUES (${empresa.fpDual},${id},'${empresa.becas}','${empresa.plazas}', '${empresa.dineroBeca}')`);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha añadido empresa con CIF ${empresa.cifEmpresa} ','${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK " +err );
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_INSERT_EMPRESA','No se ha añadido empresa con CIF ${empresa.cifEmpresa}','${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
    static async updateEmpresa(empresa, user) {
        const connection = await promisePool.getConnection();
        console.log(`UPDATE empresa SET direccion='${empresa.direccion}',nombre='${empresa.nombre}', correo='${empresa.correo}',telefono='${empresa.telefono}',url='${empresa.url}' WHERE id = ${empresa.id}`)
        try {
            await connection.beginTransaction();
            let query = `UPDATE empresa SET direccion='${empresa.direccion}',nombre='${empresa.nombre}', correo='${empresa.correo}',telefono='${empresa.telefono}',url='${empresa.url}' WHERE id = ${empresa.id}`;
            await connection.query(query)
            await connection.query(`UPDATE empresa_fpdual SET becas=${empresa.becas} ,plazas=${empresa.plazas}, dineroBeca = '${empresa.dineroBeca}' WHERE idEmpresa = '${empresa.id}' `);
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES (${null},'Se ha actualizado empresa con CIF ${empresa.cifEmpresa} ','${user}',sysdate(), 'empresa')`);
            await connection.commit();
        } catch (err) {
            await connection.query("ROLLBACK");
            await connection.query(`INSERT INTO logs(codigoError ,mensaje, usuario, fechaHoraLog, tipo) VALUES ('ERROR_UPDATE_EMPRESA','No se ha actualizado empresa con CIF ${empresa.cifEmpresa}','${user}',sysdate(), 'empresa')`);
            throw err;
        } finally {
            await connection.release();
        }

    }
};