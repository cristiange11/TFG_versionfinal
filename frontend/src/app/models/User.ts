export class User {
    dni: string;
    nombre: string;
    apellidos: string;
    correo: string;
    movil: string;
    direccion: string;
    password: string;
    genero: string;
    cp: string;
    rol: string;
    fecha_nacimiento: string;
    fp_dual: string;
    codigo_centro: string;
    constructor(form){
        this.dni= form.dni;
        this.nombre = form.nombre;
        this.apellidos= form.apellidos;
        this.correo = form.correo;
        this.movil = form.movil;
        this.direccion = form.direccion;
        this.password = form.password;
        this.genero = form.genero;
        this.cp= form.cp;
        this.rol = form.rol;
        this.fecha_nacimiento = form.fecha_nacimiento;
        this.fp_dual = form.fp_dual;
        this.codigo_centro = form.codigo_centro;
    }
}