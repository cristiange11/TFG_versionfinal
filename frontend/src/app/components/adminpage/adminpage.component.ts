import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { Centro } from 'src/app/models/Centro';
import {CentroService} from '../../services/centro.service';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  selectedcentroList: Centro [];
  centroList = new Array();
  centro: Centro;
  centroDialog: boolean;
  submitted: boolean;

  constructor(private centroService: CentroService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.centroService.getCentros().pipe(first())
      .subscribe(
        data => {
          let cent = data["centros"]
          
         cent.forEach(centroInfo => {  
            this.centroList.push(centroInfo);
          });
          console.log(this.centroList)
        },
        error => {
          console.log(error.error.message);
        });
  }
  openNew() {
    this.centro = {codigoCentro: "",
                    correo: "",
                    telefono: "",
                    provincia: "",
                    nombre: "",
                    cp: "",
                    direccion:""
  };
    this.submitted = false;
    this.centroDialog = true;
}
deleteSelectedcentroList(){

  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  hideDialog() {
    this.centroDialog = false;
    this.submitted = false;
}
editCentro(centro){

}
saveCentro(){

}
deleteCentro(centro){

}
}
