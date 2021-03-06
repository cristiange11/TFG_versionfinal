import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Fpduales } from 'src/app/models/Fpduales';
import { CentroService } from 'src/app/services/centro.service';
import { FpdualesService } from 'src/app/services/fpduales.service';

@Component({
  selector: 'app-fpdual-create',
  templateUrl: './fpdual-create.component.html',
  styleUrls: ['./fpdual-create.component.css']
})
export class FpdualCreateComponent implements OnInit {
  formInstance: FormGroup;
  fecha;
  anio;
  user;
  totalPlazasControl = new FormControl("", [Validators.required, Validators.min(1)]);
  plazasDisponiblesControl = new FormControl("", [Validators.required, this.validateScore()]);
  centroList = new Map<string, string>();
  constructor(public cookieService: CookieService, public router: Router, public dialogRef: MatDialogRef<FpdualCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fpduales, public fpdualesService: FpdualesService, public centroService: CentroService) {
    this.fecha = new Date();
    this.anio = this.fecha.getFullYear();

    this.formInstance = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      totalPlazas: this.totalPlazasControl,
      anio: new FormControl("", [Validators.required, Validators.min(this.anio)]),
      plazasDisponibles: this.plazasDisponiblesControl,
      codigoCentro: new FormControl("", [Validators.required]),
    })
    if (!this.cookieService.get('user')) {
      this.dialogRef.close();
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.dialogRef.close();
        this.router.navigate(['home']);
      }

    }
    if (sessionStorage.getItem('codigoCentro') == null) {
      this.formInstance.setValue({ nombre: "", descripcion: "", totalPlazas: "", anio: "", plazasDisponibles: "", codigoCentro: this.user.codigoCentro });
    }
    else {
      this.formInstance.setValue({ nombre: "", descripcion: "", totalPlazas: "", anio: "", plazasDisponibles: "", codigoCentro: sessionStorage.getItem('codigoCentro') });
    }

  }
  //M??todo utilizado para obtener los centros
  ngOnInit(): void {
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
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  //M??todo utilizado para comprobar que el n??mero total de plazas sea mayor al n??mero de plazas disponibles
  validateScore(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    (Number(control.value) <= Number(this.totalPlazasValue)
      ? null : { scoreError: true })
  }
  get totalPlazasValue() {
    return this.totalPlazasControl.value;
  }
  //M??todo utilizado para a??adir el FP dual
  save() {
    this.fpdualesService.addFp(this.formInstance.value).pipe(first())
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
          } else if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            this.dialogRef.close();
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
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
