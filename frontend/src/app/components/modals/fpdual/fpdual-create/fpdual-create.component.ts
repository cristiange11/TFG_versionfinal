import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  centroList = new Map<string, string>();
  constructor(public cookieService: CookieService, public router: Router, public dialogRef: MatDialogRef<FpdualCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fpduales, public fpdualesService: FpdualesService, public centroService: CentroService) {
    this.fecha = new Date();
    this.anio = this.fecha.getFullYear();

    this.formInstance = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      totalPlazas: new FormControl("", [Validators.required, Validators.min(1)]),
      anio: new FormControl("", [Validators.required, Validators.min(this.anio)]),
      plazasDisponibles: new FormControl("", [Validators.required, Validators.min(1)/*, this.validateScore*/]),
      codigoCentro: new FormControl("", [Validators.required]),
    },)
  }

  ngOnInit(): void {
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      var user = (JSON.parse(this.cookieService.get('user')));
      if (Number(user.rol) != 1) {
        this.router.navigate(['home']);
      }

    }

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
          console.log(error.error.message);
        });
  }
  validateScore(control: AbstractControl): ValidationErrors | null {
    if (control && control.get("plazasDisponibles") && control.get("totalPlazas")) {
      const totalPlazas = control.get("totalPlazas").value;
      const plazasDisponibles = control.get("plazasDisponibles").value;
      return (plazasDisponibles > totalPlazas) ? { scoreError: true } : null
    }
    return null;
  }
  save() {

    this.fpdualesService.addFp(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          
          error.error.errors.forEach(errorInfo => {
            if (error.status == 409) {

              const formControl = this.formInstance.get(errorInfo.param);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorInfo.message
                });
              }

            } else if (error.status == 401) {

              var arrayRes = new Array();
              arrayRes.push(error.error.message);
              AppComponent.myapp.openDialog(arrayRes);
              this.dialogRef.close();
            }
          });
        });



  }
}
