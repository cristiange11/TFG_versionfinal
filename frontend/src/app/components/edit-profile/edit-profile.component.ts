import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  hide = true;
  hide2 = true;
  hide3 = true;
  numero;
  user;
  formGroupTutor;
  numeroExpediente;
  formGroupProfesor;

  passwordFormControl = new FormControl("", [Validators.required, Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]);
  passwordActualFormControl = new FormControl("", [Validators.required]);
  confirmPasswordFormControl = new FormControl("", [Validators.required, this.checkConfirmPassword()]);

  centroList = new Map<string, string>();
  rolesList = new Map<number, string>();
  fpList = new Map<number, string>();
  empresaList = new Map<string, string>();
  constructor(public datepipe: DatePipe, private authService: AuthService, private router: Router, private cookieService: CookieService) {
    document.body.style.background = "linear-gradient(to right, #833ab4, #fcb045)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));

      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2 && Number(this.user.rol) != 4 && Number(this.user.rol) != 3 && Number(this.user.rol) != 5) {
        this.router.navigate(['home']);
      }


     
      this.editForm.get('nombre').setValue(this.user.nombre);
      this.editForm.get('apellidos').setValue(this.user.apellidos);
      this.editForm.get('direccion').setValue(this.user.direccion);
      this.editForm.get('cp').setValue(this.user.cp);
      this.editForm.get('movil').setValue(this.user.movil);
      this.editForm.get('correo').setValue(this.user.correo);
      this.editForm.get('fechaNacimiento').setValue(this.datepipe.transform(this.user.fechaNacimiento, "YYYY-MM-dd"));
      this.editForm.get('genero').setValue(this.user.genero);

    }
  }
  checkConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    (control.value?.toString() === this.passwordValue.toString()
      ? null : { noMatch: true })
  }

  get passwordValue() {
    return this.passwordFormControl.value;
  }
  createFormGroup(): FormGroup {
    const res = new FormGroup({

      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      apellidos: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required]),
      cp: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
      genero: new FormControl("", [Validators.required]),
      movil: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
      actualPassword: this.passwordActualFormControl,
    })
    return res;
  }
  getErrorMessage(attribute: string) {
    if (attribute == "nombre") {
      let nombre = this.editForm.get("nombre");
      let res = nombre.hasError('required') ? 'Introduce un nombre' :
        nombre.hasError('minlength') ? 'Longitud mínima de 4' :
          '';

      return res;
    } else if (attribute == "apellidos") {
      let apellidos = this.editForm.get("apellidos");
      return apellidos.hasError('required') ? 'Introduce el apellido' :
        apellidos.hasError('minlength') ? 'Longitud mínima de 4' :
          '';
    } else if (attribute == "direccion") {
      let direccion = this.editForm.get("direccion");
      return direccion.hasError('required') ? 'Introduce la dirección' :
        '';
    } else if (attribute == "cp") {
      let cp = this.editForm.get("cp");
      return cp.hasError('required') ? 'Introduce CP' :
        cp.hasError('pattern') ? 'Formato CP incorrecto' :
          '';
    } else if (attribute == "genero") {
      let genero = this.editForm.get("genero");
      return genero.hasError('required') ? 'Selecciona género' :
        '';
    } else if (attribute == "movil") {
      let movil = this.editForm.get("movil");
      return movil.hasError('required') ? 'Introduce el móvil' :
        movil.hasError('pattern') ? 'Formato móvil incorrecto' :
          '';
    } else if (attribute == "correo") {
      let correo = this.editForm.get("correo");
      return correo.hasError('required') ? 'Introduce el correo' :
        correo.hasError('email') ? 'Formato correo incorrecto' : '';
    } else if (attribute == "fechaNacimiento") {
      let fechaNacimiento = this.editForm.get("fechaNacimiento");
      return fechaNacimiento.hasError('required') ? 'Introduce la fecha' :
        '';
    }
    else if (attribute == "password") {

      let password = this.passwordFormControl
      return password.hasError('required') ? 'Introduce la contraseña' :
        password.hasError('pattern') ? 'Formato contraseña incorrecta' :
          '';
    } else if (attribute == "confirmPassword") {

      let password2 = this.confirmPasswordFormControl
      return password2.hasError('noMatch') ? 'No coinciden las contraseñas' :
        '';
    }
    return false;
  }
  editProfile() {
    this.authService.updateUsuario(this.editForm.value, this.user).pipe(first())
      .subscribe(
        data => {
          let userJson = data["user"];
          let user = new User(userJson);
          this.cookieService.set('user', JSON.stringify(user));
          var arrayRes = new Array();
          arrayRes.push("Usuario actualizado correctamente");
          AppComponent.myapp.openDialog(arrayRes);
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();

          }
          else if (error.status == 401) {
            var arrayRes = new Array();
            arrayRes.push(error.error.errors);
            AppComponent.myapp.openDialog(arrayRes);
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
          else if (error.status == 409) {
            error.error.errors.forEach(errorInfo => {
              const formControl = this.editForm.get(errorInfo.param);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorInfo.message
                });
              } if (errorInfo.param == "passwordActualFormControl") {
                this.passwordActualFormControl.setErrors({
                  serverError: errorInfo.message
                });
              }

            });
          }

        });
  }
}