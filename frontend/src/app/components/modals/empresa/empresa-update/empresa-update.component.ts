import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css']
})
export class EmpresaUpdateComponent implements OnInit {
  formInstance: FormGroup;
  dineroBeca = new FormControl("", [Validators.required, Validators.min(1)]);

  constructor(public dialogRef: MatDialogRef<EmpresaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa, public empresaService: EmpresaService) {
    this.formInstance = new FormGroup({
      cifEmpresa: new FormControl("", []),
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
      plazas: new FormControl("", [Validators.required, /*Validators.min(1)*/]),
      becas: new FormControl("", [Validators.required]),
      dineroBeca: new FormControl("", []),
      id: new FormControl("", []),
    });
    var beca;

    if (data.becas == "0") {
      beca = "no";
    } else {
      beca = "si";
    }

    this.formInstance.setValue({ cifEmpresa: data.cifEmpresa, nombre: data.nombre, direccion: data.direccion, telefono: data.telefono, correo: data.correo, url: data.url, plazas: data.plazas, becas: beca, dineroBeca: data.dineroBeca, id: data.id });
    if (this.formInstance.value.becas != "0") {
      this.dineroBeca.setValue(sessionStorage.getItem('dineroBeca'));
    }
  }
  ngOnInit(): void {
  }
  //Método para actualizar la empresa
  edit() {
    this.empresaService.updateEmpresa(this.formInstance.value, this.dineroBeca.value).pipe(first())
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
          } else if (error.status == 401 && error.error.errors == "Sesión expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 500) {
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
            res.push("No se ha podido actualizar.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
        });



  }
}

