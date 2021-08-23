import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ResultadoAprendizaje } from 'src/app/models/ResultadoAprendizaje';
import { ResultadoAprendizajeService } from 'src/app/services/resultado-aprendizaje.service';

@Component({
  selector: 'app-resultado-aprendizaje-update',
  templateUrl: './resultado-aprendizaje-update.component.html',
  styleUrls: ['./resultado-aprendizaje-update.component.css']
})
export class ResultadoAprendizajeUpdateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<ResultadoAprendizajeUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: ResultadoAprendizaje, public resultadoAprendizajeService: ResultadoAprendizajeService) {
    this.formInstance = new FormGroup({

      titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      codigoModulo: new FormControl("", []),
      id: new FormControl("", [])
    })
    this.formInstance.setValue(data);
  }


  ngOnInit(): void {
  }
  save() {
    this.resultadoAprendizajeService.updateResultadoAprendizaje(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
          this.dialogRef.close();
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
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
            res.push("No se ha podido actualizar.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
}