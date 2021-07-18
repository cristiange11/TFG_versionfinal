import { DatePipe } from '@angular/common';
import { LogEntidad } from './LogEntidad';
export class LogInicioSesion extends LogEntidad {
    codigoCentro: string;
    constructor(form, codigoCentro){
        super(form);
        this.codigoCentro = codigoCentro
    }
}