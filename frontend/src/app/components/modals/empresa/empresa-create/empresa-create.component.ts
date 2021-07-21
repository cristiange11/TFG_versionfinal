import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<EmpresaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa, public empresaService: EmpresaService) {
    this.formInstance = new FormGroup({
      cifEmpresa: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/)]),
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
    })
  }


  ngOnInit(): void {
  }
  save() {
    console.log(this.formInstance.value);
    this.empresaService.addEmpresa(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
          this.dialogRef.close();
        },
        error => {
          console.log(error)
          if (error.status == 409) {
            console.log("entro" + error)
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


