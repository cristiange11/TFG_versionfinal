import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  returnUrl: string;
  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {
    document.body.style.background = "linear-gradient(to right, #e66465, #9198e5)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  //Método utilizado para cargar el formulario y comprobar si el usuario ha iniciado sesión
  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
    if (this.cookieService.get('user')) {
      var user = (JSON.parse(this.cookieService.get('user')));
      if (Number(user.rol) == 1) {
        this.router.navigate(['adminpage']);
      }
      else if (Number(user.rol) == 2) {
        this.router.navigate(['fpdual']);
      }
      else if (Number(user.rol) == 4 || Number(user.rol) == 3 || Number(user.rol) == 5) {
        this.router.navigate(['modulo']);
      }
    }

  }
  createFormGroup(): FormGroup {
    const res = new FormGroup({
      dni: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
    return res;
  }
  //Método utilizado para el login del usuario
  login() {
    this.authService.login(this.loginForm.value.dni, this.loginForm.value.password).pipe(first())
      .subscribe(
        data => {
          let result = data["result"]
          let userJson = result["user"]
          let user = new User(userJson);
          let token = result["token"]
          this.cookieService.set('token', token);
          //this.cookieService.set( 'rol', user.rol );
          this.cookieService.set('user', JSON.stringify(user));
          var userCookie = (JSON.parse(this.cookieService.get('user')));
          this.cookieService.delete('correo');
          if (Number(userCookie.rol) == 1) {
            this.router.navigate(['adminpage']);
          }
          else if (Number(userCookie.rol) == 2) {
            this.router.navigate(['fpdual']);
          }
          else if (Number(userCookie.rol) == 4 || Number(userCookie.rol) == 3 || Number(userCookie.rol) == 5) {
            this.router.navigate(['modulo']);
          }
        },
        error => {
          if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 409) {
            const res = new Array();
            res.push(error.error.errors);
            AppComponent.myapp.openDialog(res);
          }
          else {
            var arrayRes = new Array();
            arrayRes.push(error.error.errors);
            AppComponent.myapp.openDialog(arrayRes);
          }
        });
  }
  //Método utilizado para representar los errores que haya en los campos del formulario
  getErrorMessage(attribute: String) {
    if (attribute == "dni") {
      let dni = this.loginForm.get("dni")
      return dni.hasError('required') ? 'Introduce un DNI' :
        dni.hasError('pattern') ? 'Formato incorrecto' :
          '';
    }
    else if (attribute == "password") {
      let password = this.loginForm.get("password")
      return password.hasError('required') ? 'Introduce una clave' :
        password.hasError('minlength') ? 'Longitud mínima de 6' :
          '';
    }
    return false;
  }
}
