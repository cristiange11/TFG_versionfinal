import { User } from "./User";

export class TutorEmpresa extends User {
    moduloEmpresa: string;
    cifEmpresa: string;
    constructor(form, form2){
        super(form);
        this.moduloEmpresa=form2.moduloEmpresa;
        this.cifEmpresa=form2.cifEmpresa;
    }
}