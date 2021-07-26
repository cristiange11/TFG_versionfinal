import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Encuesta } from 'src/app/models/Encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta-create',
  templateUrl: './encuesta-create.component.html',
  styleUrls: ['./encuesta-create.component.css']
})
export class EncuestaCreateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< EncuestaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Encuesta, public encuestaService: EncuestaService) { 
      this.formInstance = new FormGroup({
        titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
        descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        codigoModulo : new FormControl("",[]),
        resultado : new FormControl("",[]),
       
        dniAlumno: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
        dniTutorEmpresa: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
      })
      this.formInstance.setValue({titulo : "", descripcion : "" , codigoModulo : Number(sessionStorage.getItem('codigoModulo')), resultado : "", dniAlumno: "", dniTutorEmpresa: "" })
    }
    

  ngOnInit(): void {
  }
  save(){
    console.log(this.formInstance.value);
    this.encuestaService.addEncuesta(this.formInstance.value).pipe(first())
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
