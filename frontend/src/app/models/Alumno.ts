import { User } from "./User";

export class Alumno extends User {
    numero_expediente: string;
    constructor(form, numero_expediente){
        super(form);
        this.numero_expediente=numero_expediente;
    }
}