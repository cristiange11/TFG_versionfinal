import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Fpduales } from 'src/app/models/Fpduales';
import { CentroService } from 'src/app/services/centro.service';
import { FpdualesService } from 'src/app/services/fpduales.service';

@Component({
  selector: 'app-fpdual-update',
  templateUrl: './fpdual-update.component.html',
  styleUrls: ['./fpdual-update.component.css']
})
export class FpdualUpdateComponent implements OnInit {
  formInstance: FormGroup;
  centroList = new Map<string, string>();
  constructor(public dialogRef: MatDialogRef< FpdualUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fpduales, public fpdualesService: FpdualesService, public centroService: CentroService) { 
      this.formInstance = new FormGroup({
        nombre: new FormControl("", [Validators.required]),
        descripcion: new FormControl("", [Validators.required]),
        totalPlazas: new FormControl("", [Validators.required]),
        anio: new FormControl("", [Validators.required]),
        plazasDisponibles: new FormControl("", [Validators.required]),
        codigoCentro: new FormControl("", []),
        id: new FormControl("", []),
      })
      this.formInstance.setValue(data); }

  ngOnInit(): void {
    this.centroService.getCentros().pipe(first())
      .subscribe(
        data => {
          this.centroList = new Map<string, string>();
          let centros = data["centros"]
          centros.forEach(centroInfo => {
            
            this.centroList.set(centroInfo.codigoCentro, centroInfo.nombre)
          });
        },
        error => {
          console.log(error.error.message);
        });
  }
  save(){
   
    this.fpdualesService.updateCentro(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          error.error.errors.forEach(errorInfo => {
            if(error.status == 409){
              
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }   

            }   else if(error.status == 401){
              
              var arrayRes= new Array();
          arrayRes.push(error.error.message);
          AppComponent.myapp.openDialog(arrayRes); 
          this.dialogRef.close();
            }   
           });
        });
    
      

  }
}
