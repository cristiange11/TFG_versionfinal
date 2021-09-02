import { AlumnoService } from 'src/app/services/alumno.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Encuesta } from 'src/app/models/Encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { TutorEmpresaService } from 'src/app/services/tutor-empresa.service';
import { ResultadoEncuestaService } from 'src/app/services/resultado-encuesta.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-encuesta-create',
  templateUrl: './encuesta-create.component.html',
  styleUrls: ['./encuesta-create.component.css']
})
export class EncuestaCreateComponent implements OnInit {
  formInstance: FormGroup;
  alumnoList = new Map<string, string>();
  user;
  resultadoList;
  constructor(public dialogRef: MatDialogRef<EncuestaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Encuesta, public encuestaService: EncuestaService,public cookieService: CookieService,public resultadoService: ResultadoEncuestaService, public alumnoService: AlumnoService, public tutorService: TutorEmpresaService) {
    this.formInstance = new FormGroup({
      titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      codigoModulo: new FormControl("", []),
      observaciones : new FormControl("",[]),
      resultado : new FormControl("",[Validators.required]),
      dniAlumno: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
      dniTutorEmpresa: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
    })
    this.user = (JSON.parse(this.cookieService.get('user')));
    this.formInstance.setValue({ titulo: "", descripcion: "", codigoModulo: Number(sessionStorage.getItem('codigoModulo')), resultado: "", dniAlumno: "", dniTutorEmpresa: this.user.dni , observaciones:"" })
  }

  //Método para cargar lkos resultados de encuestas y los alumnos asociados a un módulo
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
    this.alumnoService.getAlumnosByModuloEncuesta(this.formInstance.value.codigoModulo).pipe(first())
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
  //Método utilizado para añadir la encuesta
  save() {
    this.encuestaService.addEncuesta(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
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
          else if (error.status == 409) {

            error.error.errors.forEach(errorInfo => {
              const formControl = this.formInstance.get(errorInfo.param);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorInfo.message
                });
              }
            });
          } else if (error.status == 401) {
            const res = new Array();
            res.push("No se ha podido crear.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }

        });


  }
}
