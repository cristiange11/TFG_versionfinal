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

  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< EncuestaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Encuesta, public encuestaService: EncuestaService) { 
      this.formInstance = new FormGroup({
        id: new FormControl("", []),
        titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
        descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        codigoModulo : new FormControl("",[]),
        observaciones : new FormControl("",[]),
        resultado : new FormControl("",[Validators.required, Validators.max(10), Validators.min(0)]),
        
      });
      this.formInstance.setValue({id: data.id,observaciones: data.observaciones , titulo : data.titulo, descripcion : data.descripcion , codigoModulo : Number(sessionStorage.getItem('codigoModulo')), resultado : data.resultado })

    }
    

  ngOnInit(): void {
  }
  save(){
    console.log(this.formInstance.value);
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
          res.push("No se ha podido crear.");
          AppComponent.myapp.openDialog(res);
          this.dialogRef.close();
          }
          
        });
    
   
  }

}
