import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  centroList = new Map<string, string>();
  rolesList = new Map<string, string>();
  fpList = new Map<string, string>();
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
          this.rolesList = new Map<string, string>();
          let rol = data["roles"]
          rol.forEach(rolInfo => {
            var rol = rolInfo as Rol
            this.rolesList.set(rol.codigo_rol, rol.nombre_rol)
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
      password: new FormControl("", [Validators.required, Validators.minLength(6)])

    },

    );
    return res;
  }
  obtenerFP(centro): void{
    console.log(this.signupForm.value.codigo_centro)
    this.fpdualesService.getFPdual(this.signupForm.value.codigo_centro).pipe(first())
      .subscribe(
        data => {
          
          this.fpList = new Map<string, string>();
          let fps = data["fps"]
          fps.forEach(fpInfo => {
            var fp = fps as Fpduales
            this.rolesList.set(fp.codigo_centro, fp.nombre)
          });
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
        },
        error => {

          console.log(error.error.message);

        });


  }
}

