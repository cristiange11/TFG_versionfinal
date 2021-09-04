import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-reset-contrasena',
  templateUrl: './reset-contrasena.component.html',
  styleUrls: ['./reset-contrasena.component.css']
})
export class ResetContrasenaComponent implements OnInit {
  formInstance: FormGroup;
  hide = true;
  hide2 = true;
  passwordFormControl = new FormControl("", [Validators.required, Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]);
  confirmPasswordFormControl = new FormControl("", [Validators.required, this.checkConfirmPassword()]);
  constructor(public route: ActivatedRoute, public cookieService: CookieService, public authService: AuthService, public router: Router, public nagivationComponent: NavigationComponent) {
    document.body.style.background = "linear-gradient(to right, #f1e70a, #00ffe7)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    this.formInstance = new FormGroup({
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    })
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.cookieService.set('token', params['token']);
        this.cookieService.set('correo', params['user']);
      }
      );
    if (this.cookieService.get('correo') == 'undefined') {
      this.router.navigate(['']);
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
  recoveryPassword() {
    this.authService.updatePassword(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          AppComponent.myapp.openDialogUpdatePassword();
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            const res = new Array();
            res.push("El enlace ha caducado.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
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
          } else {
            const res = new Array();
            res.push("No se ha podido cambiar la contraseña.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }

}
