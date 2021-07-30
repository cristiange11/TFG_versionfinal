import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Calificacion } from 'src/app/models/Calificacion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-calificacion-create',
  templateUrl: './calificacion-create.component.html',
  styleUrls: ['./calificacion-create.component.css']
})
export class CalificacionCreateComponent implements OnInit {
  alumnoList = [];
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< CalificacionCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calificacion, public calificacionService: CalificacionService, public alumnoService: AlumnoService) { 
      this.formInstance = new FormGroup({
        alumnos: new FormControl("", [Validators.required]),
        nota: new FormControl("", [Validators.required, Validators.min(0), Validators.max(10)]),
        descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        codigoModulo: new FormControl(sessionStorage.getItem('codigoModulo'), [Validators.required]),
       
      })
      
    }
    

  ngOnInit(): void {
    this.alumnoService.getAlumnoByModulo(this.formInstance.value.codigoModulo).pipe(first())
    .subscribe(
      data => {
        console.log(data)
      },
      error => {
        
        if(error.status == 409){
          
          error.error.errors.forEach(errorInfo => {
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }          
           });
        }
        else if(error.status == 401 && error.error.errors == "Sesión expirada"){
          this.dialogRef.close(); 
          AppComponent.myapp.openDialogSesion();                             
        }
        else if (error.status == 406) {
          const res = new Array();
          res.push("Cabecera incorrecta.");
          AppComponent.myapp.openDialog(res);
        }
        else if(error.status == 401){
          const res = new Array();
        res.push("No se ha podido crear.");
        AppComponent.myapp.openDialog(res);
        this.dialogRef.close();
        }
      });
  }
  save(){
    console.log(this.formInstance.value);
    this.calificacionService.addCalificacion(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          
          if(error.status == 409){
            
            error.error.errors.forEach(errorInfo => {
              const formControl = this.formInstance.get(errorInfo.param);
               if (formControl) {
                 formControl.setErrors({
                   serverError: errorInfo.message
                 });  
               }          
             });
          }
          else if(error.status == 401 && error.error.errors == "Sesión expirada"){
            this.dialogRef.close(); 
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Cabecera incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if(error.status == 401){
            const res = new Array();
          res.push("No se ha podido crear.");
          AppComponent.myapp.openDialog(res);
          this.dialogRef.close();
          }
        });
  }
}
