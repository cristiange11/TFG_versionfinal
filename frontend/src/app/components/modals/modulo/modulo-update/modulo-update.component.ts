import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Modulo } from 'src/app/models/Modulo';
import { ModuloService } from 'src/app/services/modulo.service';

@Component({
  selector: 'app-modulo-update',
  templateUrl: './modulo-update.component.html',
  styleUrls: ['./modulo-update.component.css']
})
export class ModuloUpdateComponent implements OnInit {

  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModuloUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modulo, public moduloService: ModuloService) {
    this.formInstance = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      curso: new FormControl("", [Validators.required, Validators.min(1), Validators.max(2)]),
      fpDual: new FormControl("", []),
      codigo: new FormControl("", []),
    });
    this.formInstance.setValue(data);
  }


  ngOnInit(): void {
  }
  edit() {
    this.moduloService.updateModulo(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
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
            res.push("Cabecera incorrecta.");
            AppComponent.myapp.openDialog(res);
          }

        });



  }

}
