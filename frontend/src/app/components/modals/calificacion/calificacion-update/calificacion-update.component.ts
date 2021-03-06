import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Calificacion } from 'src/app/models/Calificacion';
import { CalificacionService } from 'src/app/services/calificacion.service';
@Component({
  selector: 'app-calificacion-update',
  templateUrl: './calificacion-update.component.html',
  styleUrls: ['./calificacion-update.component.css']
})
export class CalificacionUpdateComponent implements OnInit {


  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<CalificacionUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calificacion, public calificacionService: CalificacionService) {
    this.formInstance = new FormGroup({
      dni: new FormControl("", []),
      nota: new FormControl("", [Validators.required, Validators.min(0), Validators.max(10)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      nombre: new FormControl("", []),
      codigoModulo: new FormControl("", []),
      id: new FormControl("", []),
    })
    this.formInstance.setValue(data);
  }


  ngOnInit(): void {

  }
  //Método para actualizar la calificación
  save() {
    this.calificacionService.updateCalificacion(this.formInstance.value).pipe(first())
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
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 401) {
            const res = new Array();
            res.push("No se ha podido actualizar.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
        });
  }
}
