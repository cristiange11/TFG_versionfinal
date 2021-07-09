import { User } from "./User";

export class Profesor extends User{
    departamento: string;
    constructor(form, departamento){
        super(form);
        this.departamento=departamento;
    }
}