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
  alumnoList = new Map<string, string>();
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<CalificacionCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calificacion, public calificacionService: CalificacionService, public alumnoService: AlumnoService) {
    this.formInstance = new FormGroup({
      dni: new FormControl("", [Validators.required]),
      nota: new FormControl("", [Validators.required, Validators.min(0), Validators.max(10)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      codigoModulo: new FormControl(sessionStorage.getItem('codigoModulo'), [Validators.required]),
    })
  }

  //Método para cargar los alumnos que aún no tengan calificación en el módulo
  ngOnInit(): void {
    this.alumnoService.getAlumnoByModuloWithoutMark(this.formInstance.value.codigoModulo).pipe(first())
      .subscribe(
        data => {
          let alumnos = JSON.parse(data["alumnos"])
          alumnos.forEach(alumnoInfo => {
            var nombreApellidos = alumnoInfo.nombre + " " + alumnoInfo.apellidos;
            this.alumnoList.set(alumnoInfo.dni, nombreApellidos);
          })
        },
        error => {
          if (error.status == 409) {
            error.error.errors.forEach(errorInfo => {
              const formControl = this.formInstance.get(errorInfo.param);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorInfo.message
                });
              }
            });
          }
          else if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 401) {
            const res = new Array();
            res.push("No se ha podido crear.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
        });
  }
  //Método para añadir la calificación
  save() {
    this.calificacionService.addCalificacion(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          if (error.status == 409) {
            error.error.errors.forEach(errorInfo => {
              const formControl = this.formInstance.get(errorInfo.param);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorInfo.message
                });
              }
            });
          }
          else if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 401) {
            const res = new Array();
            res.push("No se ha podido crear.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
        });
  }
}
