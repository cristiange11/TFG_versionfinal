import { User } from "./User";

export class Alumno extends User {
    numero_expediente: string;
    constructor(form, numeroExpediente){
        super(form);
        this.numero_expediente=numeroExpediente;
    }
}