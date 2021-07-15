import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  hide = true;
  hide2 = true;
  numero;
  formGroupTutor;
  numeroExpediente;
  formGroupProfesor;
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(
      "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
    )
  ]);

  confirmPasswordFormControl = new FormControl("", [
    Validators.required,
    this.checkConfirmPassword()
  ]);

  centroList = new Map<string, string>();
  rolesList = new Map<number, string>();
  fpList = new Map<number, string>();
  empresaList = new Map<string, string>();
  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if(Number(this.cookieService.get('rol'))!=1){
      this.router.navigate(['home']);
    }
    this.editForm = this.createFormGroup();

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
    dni: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
    nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
    apellidos: new FormControl("", [Validators.required, Validators.minLength(4)]),
    direccion: new FormControl("", [Validators.required]),
    cp: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
    genero: new FormControl("", [Validators.required]),
    movil: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/)]),
    correo: new FormControl("", [Validators.required, Validators.email]),
    fechaNacimiento: new FormControl("", [Validators.required, Validators.pattern(/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/)]),
    rol: new FormControl("", [Validators.required]),
    codigoCentro: new FormControl("", [Validators.required]),
    fpDual: new FormControl("", [Validators.required]),
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl
  })
  return res;
}
getErrorMessage(attribute: string){
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
      fechaNacimiento.hasError('pattern') ? 'Formato fecha incorrecta' :
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
editProfile(){
  console.log("entro")
}
}