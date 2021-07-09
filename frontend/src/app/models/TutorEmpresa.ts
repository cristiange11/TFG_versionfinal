import { User } from "./User";

export class TutorEmpresa extends User {
    modulo_empresa: string;
    cif_empresa: string;
    constructor(form, form2){
        super(form);
        this.modulo_empresa=form2.modulo_empresa;
        this.cif_empresa=form2.cif_empresa;
    }
}