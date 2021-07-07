import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn,  Validators } from "@angular/forms";
import { MatSelect } from '@angular/material/select';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CentroService } from 'src/app/services/centro.service';
import { RolService } from 'src/app/services/rol.service';
import { FpdualesService } from 'src/app/services/fpduales.service';
import { User } from '../../models/User';
import { Centro } from '../../models/Centro';
import { Rol } from 'src/app/models/Rol';
import { Fpduales } from 'src/app/models/Fpduales';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  hide2 = true;
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
  constructor(private authService: AuthService, private centroService: CentroService, private rolService: RolService, private fpdualesService: FpdualesService) {
    document.body.style.background = "linear-gradient(to right, #1dcd9b, #00d4ff)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  ngOnInit(): void {
    this.centroService.getCentros().pipe(first())
      .subscribe(
        data => {
          this.centroList = new Map<string, string>();
          let centros = data["centros"]
          centros.forEach(centroInfo => {
            var centro = centroInfo as Centro
            this.centroList.set(centro.codigo_centro, centro.nombre)
          });
        },
        error => {
          console.log(error.error.message);
        });
    this.rolService.getRoles().pipe(first())
      .subscribe(
        data => {
          this.rolesList = new Map<number, string>();
          let rol = data["roles"]
          rol.forEach(rolInfo => {
            var rol = rolInfo as Rol
            this.rolesList.set(rol.id, rol.nombre_rol)
          });
        },
        error => {
          console.log(error.error.message);
        });

    this.signupForm = this.createFormGroup();

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
      fecha_nacimiento: new FormControl("", [Validators.required, Validators.pattern(/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/)]),
      rol: new FormControl("", [Validators.required]),
      codigo_centro: new FormControl("", [Validators.required]),
      fp_dual: new FormControl("", [Validators.required]),
     
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
        
    })
    return res;
  }

  checkConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        (control.value?.toString() === this.passwordValue.toString()
            ? null : {noMatch: true})
  }

  get passwordValue() {
    
    return this.passwordFormControl.value;
  }

  obtenerFP(centro): void {

    this.fpdualesService.getFPdual(centro).pipe(first())
      .subscribe(
        data => {
          this.fpList = new Map<number, string>();
          let fps = data["fps"]
          fps.forEach(fpInfo => {
            var fp = fpInfo as Fpduales
            console.log(fp)
            this.fpList.set(fp.id, fp.nombre)
          });
          console.log(this.fpList)

        },
        error => {
          console.log(error.error.message);
        });
  }
  signup(): void {


    this.authService.signup(this.signupForm.value).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          var rol = this.signupForm.value.rol
          console.log(rol)
        },
        error => {

          console.log(error.error.message);

        });


  }
  getErrorMessage(attribute: String) {
    if (attribute == "dni") {
      let dni = this.signupForm.get("dni")
      return dni.hasError('required') ? 'Introduce un DNI' :
        dni.hasError('pattern') ? 'Formato incorrecto' :
          'error dni';
    } else if (attribute == "nombre") {
      let nombre = this.signupForm.get("nombre");
      let res = nombre.hasError('required') ? 'Introduce un nombre' :
      nombre.hasError('minlength') ? 'Longitud mínima de 4' :
        '';
        
        return res;
    } else if (attribute == "apellidos") {
      let apellidos = this.signupForm.get("apellidos");
      return apellidos.hasError('required') ? 'Introduce el apellido' :
        apellidos.hasError('minlength') ? 'Longitud mínima de 4' :
          '';
    } else if (attribute == "direccion") {
      let direccion = this.signupForm.get("direccion");
      return direccion.hasError('required') ? 'Introduce la dirección' :
        '';
    } else if (attribute == "cp") {
      let cp = this.signupForm.get("cp");
      return cp.hasError('required') ? 'Introduce CP' :
        cp.hasError('pattern') ? 'Formato CP incorrecto' :
          '';
    } else if (attribute == "genero") {
      let genero = this.signupForm.get("genero");
      return genero.hasError('required') ? 'Selecciona género' :
        '';
    } else if (attribute == "movil") {
      let movil = this.signupForm.get("movil");
      return movil.hasError('required') ? 'Introduce el móvil' :
        movil.hasError('pattern') ? 'Formato móvil incorrecto' :
          '';
    } else if (attribute == "correo") {
      let correo = this.signupForm.get("correo");
      return correo.hasError('required') ? 'Introduce el correo' :
        correo.hasError('email') ? 'Formato correo incorrecto' :
          '';
    } else if (attribute == "fecha_nacimiento") {
      let fecha_nacimiento = this.signupForm.get("fecha_nacimiento");
      return fecha_nacimiento.hasError('required') ? 'Introduce la fecha' :
      fecha_nacimiento.hasError('pattern') ? 'Formato fecha incorrecta' :
          '';
    }
    else if (attribute == "password") {
      console.log("entro a")
      let password = this.passwordFormControl
      return password.hasError('required') ? 'Introduce la contraseña' :
      password.hasError('pattern') ? 'Formato contraseña incorrecta' :
          '';
    }else if (attribute == "confirmPassword") {
      console.log("entro")
      let password2 = this.confirmPasswordFormControl
      return password2.hasError('noMatch') ? 'No coinciden las contraseñas' :
          '';
    }else if (attribute == "rol") {
      let rol = this.signupForm.get("rol");
      return rol.hasError('required') ? 'Selecciona un rol' :
          '';
    }else if (attribute == "codigo_centro") {
      let codigo_centro = this.signupForm.get("codigo_centro");
      return codigo_centro.hasError('required') ? 'Selecciona un centro' :
          '';
    }else if (attribute == "fp_dual") {
      let fp_dual = this.signupForm.get("fp_dual");
      
      return fp_dual.hasError('required') ? 'Selecciona un FP dual' :
          '';
    }
    return false;
  }
}
