import { DatePipe } from '@angular/common';
export class LogEntidad {
    usuario: string;
    fechaHoraLog: DatePipe;
    idLog: number;
    DML: string;
    error: number;
    constructor(form){
        this.usuario=form.usuario,
        this.fechaHoraLog=form.fechaHoraLog,
        this.idLog=form.idLog,
        this.DML=form.DML,
        this.error=form.error
    }
}