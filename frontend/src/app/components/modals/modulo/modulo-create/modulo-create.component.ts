import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-modulo-create',
  templateUrl: './modulo-create.component.html',
  styleUrls: ['./modulo-create.component.css']
})
export class ModuloCreateComponent implements OnInit {

  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModuloCreateComponent>, public moduloService: ModuloService) {
    this.formInstance = new FormGroup({

      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      curso: new FormControl("", [Validators.required, Validators.min(1), Validators.max(2)]),
      fpDual: new FormControl("", []),
    })
    this.formInstance.setValue({ nombre: "", descripcion: "", curso: "", fpDual: Number(sessionStorage.getItem('fpDual')) });
  }


  ngOnInit(): void {
  }
  save() {
    this.moduloService.addModulo(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
          this.dialogRef.close();
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
