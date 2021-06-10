const db= require('../util/database');

module.exports= class User {
    constructor(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp , rol , fecha_nacimiento, nombre_usuario, codigo_centro){
        this.dni=dni;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.correo=correo;
        this.movil=movil;
        this.direccion=direccion;
        this.password=password;
        this.genero=genero;
        this.cp=cp;
        this.rol=rol;
        this.fecha_nacimiento=fecha_nacimiento;
        this.nombre_usuario=nombre_usuario;
        this.codigo_centro=codigo_centro;
    }
    static find(dni){
        return db.execute(
            'SELECT * FROM usuario where dni = ?',[dni]);
    }
    static findUsuario(nombre_usuario){
        return db.execute(
            'SELECT * FROM usuario where nombre_usuario = ?',[nombre_usuario]);
    }
    static findCorreo(correo){
        return db.execute(
            'SELECT * FROM usuario where correo = ?',[correo]);
    }
    static findMovil(movil){
        return db.execute(
            'SELECT * FROM usuario where movil = ?',[movil]);
    }
    static save(user){
        return db.execute(
            'INSERT INTO usuario(dni, nombre, apellidos, correo, movil, direccion, password, genero, cp, rol, fecha_nacimiento, nombre_usuario, codigo_centro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [user.dni, user.nombre, user.apellidos, user.correo, user.movil, user. direccion, user.password. user.genero, user.cp, user.rol, user.fecha_nacimiento, user.nombre_usuario, user.codigo_centro]
        );
    }
};