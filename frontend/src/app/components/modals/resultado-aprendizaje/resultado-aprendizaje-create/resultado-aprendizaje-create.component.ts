import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ResultadoAprendizajeService } from 'src/app/services/resultado-aprendizaje.service';

@Component({
  selector: 'app-resultado-aprendizaje-create',
  templateUrl: './resultado-aprendizaje-create.component.html',
  styleUrls: ['./resultado-aprendizaje-create.component.css']
})
export class ResultadoAprendizajeCreateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<ResultadoAprendizajeCreateComponent>, public resultadoAprendizajeService: ResultadoAprendizajeService) {
    this.formInstance = new FormGroup({

      titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      codigoModulo: new FormControl("", [])
    })
    this.formInstance.setValue({ titulo: "", descripcion: "", codigoModulo: Number(sessionStorage.getItem('codigoModulo')) });
  }


  ngOnInit(): void {
  }
  save() {
    console.log(this.formInstance.value);
    this.resultadoAprendizajeService.addResultadoAprendizaje(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
          this.dialogRef.close();
        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
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
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }

}
