import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { Empresa } from 'src/app/models/Empresa';
import { Fpduales } from 'src/app/models/Fpduales';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FpdualesService } from 'src/app/services/fpduales.service';
@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {
  formInstance: FormGroup;
  fpList = new Map<number, string>();
  constructor(public dialogRef: MatDialogRef<EmpresaCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: Empresa, private nagivationComponent: NavigationComponent, public empresaService: EmpresaService, private fpdualesService: FpdualesService) {
    
    this.formInstance = new FormGroup({
      cifEmpresa: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/)]),
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
      plazas: new FormControl("", [Validators.required, Validators.min(1)]),
      becas: new FormControl("", [Validators.required]),
      fpDual: new FormControl("", [Validators.required]),
    })
  }


  ngOnInit(): void {
    this.fpdualesService.getFps().pipe(first())
      .subscribe(
        data => {
          this.fpList = new Map<number, string>();
          let fps = data["fps"]
          fps.forEach(fpInfo => {
            var fp = fpInfo as Fpduales

            this.fpList.set(fp.id, fp.nombre)
          });
        },

        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  save() {
    console.log(this.formInstance.value);
    this.empresaService.addEmpresa(this.formInstance.value).pipe(first())
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
          } else if(error.status == 401 && error.error.errors == "Sesión expirada"){
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
            res.push("No se ha podido crear.");
            AppComponent.myapp.openDialog(res);
            this.dialogRef.close();
          }
        });


  }
}


