import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public authService: AuthService, public cookieService: CookieService, public nagivationComponent: NavigationComponent) {
    document.body.style.background = "linear-gradient(to right, #a93ab4, #1e1dfd)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    this.formInstance = new FormGroup({
      correo: new FormControl("", [Validators.required, Validators.email])
    })


  } ngOnInit(): void {
  }
  recoveryPassword() {
    this.authService.recoveryPassword(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
          const res = new Array();
          res.push(" Se ha enviado un correo para restablecer la contraseña en unos minutos. Si no has recibido el correo, echa un vistazo a la carpeta de spam. ");
          AppComponent.myapp.opencorreoDialogSesion(res);

        },
        error => {

          if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }else if (error.status == 500) {
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
          }
        });
  }
}