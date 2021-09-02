import { User } from "./User";

export class Alumno extends User {
    numeroExpediente: string;
    constructor(form, numeroExpediente) {
        super(form);
        this.numeroExpediente = numeroExpediente;
    }
}