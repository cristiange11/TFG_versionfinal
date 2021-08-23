import { ResultadoEncuestaService } from './../../../../services/resultado-encuesta.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Encuesta } from 'src/app/models/Encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { EncuestaCreateComponent } from '../encuesta-create/encuesta-create.component';

@Component({
  selector: 'app-encuesta-update',
  templateUrl: './encuesta-update.component.html',
  styleUrls: ['./encuesta-update.component.css']
})
export class EncuestaUpdateComponent implements OnInit {
  resultadoList;
  formInstance: FormGroup;
  resultado;
  constructor(public resultadoService: ResultadoEncuestaService, public dialogRef: MatDialogRef< EncuestaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Encuesta, public encuestaService: EncuestaService) { 
      this.formInstance = new FormGroup({
        id: new FormControl("", []),
        titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
        descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        codigoModulo : new FormControl("",[]),
        observaciones : new FormControl("",[]),
        resultado : new FormControl("",[Validators.required]),
        
      });
     
      if(data.resultado == "Deficiente"){
        this.resultado= 1;
      }else if(data.resultado == "Aceptable"){
        this.resultado = 2;
      }else if(data.resultado == "Regular"){
        this.resultado = 3;
      }else if(data.resultado == "Bien"){
        this.resultado = 4;
      }else if(data.resultado == "Óptimo"){
        this.resultado = 5;
      }
      this.formInstance.setValue({id: data.id,observaciones: data.observaciones , titulo : data.titulo, descripcion : data.descripcion , codigoModulo : Number(sessionStorage.getItem('codigoModulo')), resultado : this.resultado })

    }
    

  ngOnInit(): void {
    this.resultadoService.getResultados().pipe(first())
      .subscribe(
        data => {
          this.resultadoList = new Map<number, string>();
          let resultado = data["resultados"]
          resultado.forEach(resultadoInfo => {
            
            this.resultadoList.set(resultadoInfo.id, resultadoInfo.resultado);
            
          });
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
  
  }
  save(){
    this.encuestaService.updateEncuesta(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();                             
          }else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if(error.status == 409){
            error.error.errors.forEach(errorInfo => {
              const formControl = this.formInstance.get(errorInfo.param);
               if (formControl) {
                 formControl.setErrors({
                   serverError: errorInfo.message
                 });  
               }          
             });
          }else if(error.status == 401){
            const res = new Array();
          res.push("No se ha podido actualizar.");
          AppComponent.myapp.openDialog(res);
          this.dialogRef.close();
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
          
        });
    
   
  }

}
