import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from 'src/app/models/Centro';
import { CentroService } from '../../../../services/centro.service';
import { AppComponent } from '../../../../app.component';


@Component({
  selector: 'app-centro-update',
  templateUrl: './centro-update.component.html',
  styleUrls: ['./centro-update.component.css']
})
export class CentroUpdateComponent implements OnInit {
  formInstance: FormGroup;
  constructor( public dialogRef: MatDialogRef<CentroUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Centro, public centroService: CentroService) {
    this.formInstance = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      provincia: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      CP: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      codigoCentro: new FormControl("", []),
    })
    this.formInstance.setValue(data);
  }

  ngOnInit(): void {}
  //Método utilizado para actualizar un centro
  save() {
    this.centroService.updateCentro(this.formInstance.value).pipe(first())
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
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });



  }

}
