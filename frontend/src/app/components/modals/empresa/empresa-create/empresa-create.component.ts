import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { Empresa } from 'src/app/models/Empresa';
import { Fpduales } from 'src/app/models/Fpduales';
import { CentroService } from 'src/app/services/centro.service';
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
  user;
  codigoCentro = new FormControl("", [Validators.required]);
  centroList = new Map<string, string>();
  dineroBeca = new FormControl("", [Validators.required, Validators.min(1)]);
  constructor(private centroService: CentroService, private router: Router, private cookieService: CookieService, public dialogRef: MatDialogRef<EmpresaCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: Empresa, private nagivationComponent: NavigationComponent, public empresaService: EmpresaService, private fpdualesService: FpdualesService) {

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
      codigoCentro : this.codigoCentro
    })
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.dialogRef.close();
        this.router.navigate(['home']);
      }

    }
  }

  obtenerFP(centro): void {   
      this.fpdualesService.getFPdual(centro).pipe(first())
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
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });   
  }

  ngOnInit(): void {
    if (this.user.rol == 2) {
      this.fpdualesService.getFPsByCentro(this.user.codigoCentro).pipe(first())
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
          });
    }
    else if (this.user.rol == 1) {
      this.centroService.getCentros().pipe(first())
        .subscribe(
          data => {
            this.centroList = new Map<string, string>();
            let centros = data["centros"]

            centros.forEach(centroInfo => {

              this.centroList.set(centroInfo.codigoCentro, centroInfo.nombre)
            });
          },
          error => {
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
      
    }
  }
  save() {
    this.empresaService.addEmpresa(this.formInstance.value, this.dineroBeca.value).pipe(first())
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
              } if (errorInfo.param == "dineroBeca") {
                this.dineroBeca.setErrors({
                  serverError: errorInfo.message
                });
              }
            });
          } else if (error.status == 401 && error.error.errors == "Sesión expirada") {
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
}


