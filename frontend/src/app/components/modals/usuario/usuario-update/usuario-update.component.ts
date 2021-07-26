import { FpdualesService } from './../../../../services/fpduales.service';
import { EmpresaService } from './../../../../services/empresa.service';
import { RolService } from './../../../../services/rol.service';
import { User } from './../../../../models/User';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TutorEmpresaService } from 'src/app/services/tutor-empresa.service';
import { Fpduales } from 'src/app/models/Fpduales';
import { Empresa } from 'src/app/models/Empresa';
import { CentroService } from 'src/app/services/centro.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { DatePipe } from '@angular/common';
import { Modulo } from 'src/app/models/Modulo';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {
  formInstance: FormGroup;
  hide = true;
  hide2 = true;
  numero = 1;
  user;
  modulo;
  formGroupTutor;
  numeroExpediente;
  formGroupProfesor;
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(
      "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
    )
  ]);
  codigoCentro = new FormControl("", [Validators.required]);
  fpDual = new FormControl("", [Validators.required]);

  confirmPasswordFormControl = new FormControl("", [
    Validators.required,
    this.checkConfirmPassword()
  ]);

  centroList = new Map<string, string>();
  rolesList = new Map<number, string>();
  fpList = new Map<number, string>();
  moduloList = new Map<number, string>();
  empresaList = new Map<string, string>();
  constructor(public datepipe: DatePipe, private nagivationComponent: NavigationComponent, private moduloService: ModuloService, private fpdualesService: FpdualesService, private centroService: CentroService, private empresaService: EmpresaService, private tutorService: TutorEmpresaService, private alumnoService: AlumnoService, private profesorService: ProfesorService, private router: Router, private rolService: RolService, private cookieService: CookieService, public dialogRef: MatDialogRef<UsuarioUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, public authService: AuthService) {
      
      this.formInstance = new FormGroup({
      dni: new FormControl("", []),
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      apellidos: new FormControl("", [Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      cp: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
      genero: new FormControl("", [Validators.required]),
      movil: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      rol: new FormControl("", [Validators.required]),

      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    })
    this.formInstance.setValue({
      dni: data.dni, nombre: data.nombre, apellidos: data.apellidos,
      direccion: data.direccion, cp: data.cp, genero: data.genero, movil: data.movil, correo: data.correo,
      fechaNacimiento: this.datepipe.transform(data.fechaNacimiento, "YYYY-dd-MM"), rol: data.rol, password: "", confirmPassword: ""
    })
    this.rellenarFormulario(data);
    this.user = data;
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      this.user =(JSON.parse(this.cookieService.get('user')));
    if(Number(this.user.rol)!=1 && Number(this.user.rol) != 2){
      this.dialogRef.close();
      this.router.navigate(['home']);
    }
    
  }
  }
  rellenarFormulario(data){
    console.log(data)
      if(data.rol == "Alumno"){
        //this.numeroExpediente.setValue({numeroExpediente: })
      }
  }
  ngOnInit(): void {
    

    this.rolService.getRoles().pipe(first())
      .subscribe(
        data => {
          this.rolesList = new Map<number, string>();
          let rol = data["roles"]
          rol.forEach(rolInfo => {
            if(Number(this.user.rol) == 1){
              this.rolesList.set(rolInfo.id, rolInfo.nombreRol)
            }
            else if(Number(this.user.rol) == 2 && rolInfo.id != 1){
              this.rolesList.set(rolInfo.id, rolInfo.nombreRol)
            }
            
          });
        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }

  checkConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    (control.value?.toString() === this.passwordValue.toString()
      ? null : { noMatch: true })
  }

  get passwordValue() {
    return this.passwordFormControl.value;
  }
  obtenerRol(rol): number {
    this.numero = rol;

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
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
  

    if (rol == 5) {
      this.modulo = new FormControl("", [Validators.required]);
      this.numeroExpediente = new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]);
    }
    else if (rol == 4) {
      this.modulo = new FormControl("", [Validators.required]);
      this.formGroupProfesor = new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]);
    } else if (rol == 3) {
      this.modulo = new FormControl("", [Validators.required]);
      this.formGroupTutor = new FormGroup({
        moduloEmpresa: new FormControl("", [Validators.required, Validators.minLength(6)]),
        cifEmpresa: new FormControl("", [Validators.required]),
      })
      this.empresaService.getEmpresas().pipe(first())
        .subscribe(
          data => {
            this.empresaList = new Map<string, string>();
            let empresas = data["empresas"]
            empresas.forEach(empresaInfo => {
              var empresa = empresaInfo as Empresa
              this.empresaList.set(empresa.cifEmpresa, empresa.nombre)
            });
          },
          error => {
            if(error.status == 401 && error.error.errors == "Sesión expirada"){
              AppComponent.myapp.openDialogSesion();                             
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }
    return this.numero;
  }
  obtenerModulo(fp): void {

    this.moduloService.getModulos(fp).pipe(first())
      .subscribe(
        data => {
          this.moduloList = new Map<number, string>();
          let modulos = data["modulos"]
          modulos.forEach(moduloInfo => {
            var modulo = moduloInfo as Modulo

            this.moduloList.set(modulo.codigo, modulo.nombre)
          });

        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
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
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  save() {

    var userJson = {
      codigoCentro: this.codigoCentro.value,
      fpDual: this.fpDual.value,
      rol: this.formInstance.value.rol,
      dni: this.formInstance.value.dni
    };
    if (this.numero == 1 || this.numero == 2) {
      console.log(this.formInstance.value)
      this.authService.updateUsuario(this.formInstance.value, userJson).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            console.log(error)
            if (error.status == 409) {

              error.error.errors.forEach(errorInfo => {
                const formControl = this.formInstance.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                }
              });
            }
            else if(error.status == 401 && error.error.errors == "Sesión expirada"){
              AppComponent.myapp.openDialogSesion();                             
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }

    else if (this.numero == 5) {
      console.log(this.modulo.value)
      this.alumnoService.updateAlumno(this.formInstance.value, userJson, this.numeroExpediente.value, this.modulo.value).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            console.log(error)
            if (error.status == 409) {
              error.error.errors.forEach(errorInfo => {
                const formControl = this.formInstance.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });

                }
                if (errorInfo.param == "numeroExpediente") {
                  this.numeroExpediente.setErrors({
                    serverError: errorInfo.message
                  });
                }

              });
            }
            else if(error.status == 401 && error.error.errors == "Sesión expirada"){
              AppComponent.myapp.openDialogSesion();                             
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 4) {

      this.profesorService.updateProfesor(this.formInstance.value, userJson, this.formGroupProfesor.value, this.modulo.value).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            console.log(error)
            if (error.status == 409) {

              error.error.errors.forEach(errorInfo => {
                const formControl = this.formInstance.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                }
              });
            } else if(error.status == 401 && error.error.errors == "Sesión expirada"){
              AppComponent.myapp.openDialogSesion();                             
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 3) {

      this.tutorService.updateTutor(this.formInstance.value, userJson, this.formGroupTutor.value, this.modulo.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error)
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if(error.status==409){
          error.error.errors.forEach(errorInfo => {
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }          
           });
        }});
      }
    


  }

}
