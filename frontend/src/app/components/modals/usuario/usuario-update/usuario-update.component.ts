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
  numero;
  user;
  modulo  = new FormControl("", [Validators.required]) ;
  formGroupTutor = new FormControl("", [Validators.required, Validators.minLength(6)]);
  numeroExpediente = new FormControl("", [Validators.required, Validators.minLength(6)]);
  formGroupProfesor = new FormControl("", [Validators.required, Validators.minLength(6)]);
  passwordFormControl = new FormControl("", [Validators.required, Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]);
  codigoCentro = new FormControl("", [Validators.required]);
  fpDual = new FormControl("", [Validators.required]);

  confirmPasswordFormControl = new FormControl("", [Validators.required, this.checkConfirmPassword()]);
  cifEmpresa;
  centroList = new Map<string, string>();
  rolesList = new Map<number, string>();
  fpList = new Map<number, string>();
  moduloUserList = new Map<number, string>();
  moduloList = new Map<number, string>();
  empresaList = new Map<string, string>();
  constructor(public datepipe: DatePipe, private nagivationComponent: NavigationComponent, private moduloService: ModuloService, private fpdualesService: FpdualesService, private centroService: CentroService, private empresaService: EmpresaService, private tutorService: TutorEmpresaService, private alumnoService: AlumnoService, private profesorService: ProfesorService, private router: Router, private rolService: RolService, private cookieService: CookieService, public dialogRef: MatDialogRef<UsuarioUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, public authService: AuthService) {
    this.numero=data.rol;
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
      rol: new FormControl("", []),
      fpDual: new FormControl("", []),
      codigoCentro: new FormControl("", []),
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    })
    this.rellenarFormulario(data);
        
    this.user = data;
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.dialogRef.close();
        this.router.navigate(['home']);
      }

    }
  }
  rellenarFormulario(data) {
    this.formInstance.setValue({
      dni: data.dni, nombre: data.nombre, apellidos: data.apellidos,
      direccion: data.direccion, cp: data.cp, genero: data.genero, movil: data.movil, correo: data.correo,
      fechaNacimiento: this.datepipe.transform(data.fechaNacimiento, "YYYY-dd-MM"), rol: data.rolId, password: "", confirmPassword: "", codigoCentro: data.codigoCent, fpDual: data.fpId,
    })
    console.log("ROL => " + data.rol)
    if (data.rol == "Alumno") {
      
      this.alumnoService.getAlumno(data.dni).pipe(first())
    .subscribe(
      data => {        
        var alumno =  JSON.parse(data['alumno']);
        Array.prototype.forEach.call(alumno, moduloInfo => {
          this.moduloUserList.set(moduloInfo.moduloCodigo, moduloInfo.nombreModulo);
        });
        this.modulo.setValue(Array.from( this.moduloUserList.keys() ))
        this.numeroExpediente.setValue(alumno[0].numeroExpediente);
      },     
      error => {
        if (error.status == 401 && error.error.errors == "Sesión expirada") {
          AppComponent.myapp.openDialogSesion();
        }
        else if (error.status == 406) {
          const res = new Array();
          res.push("Petición incorrecta.");
          AppComponent.myapp.openDialog(res);
        }
      });
    }
    else if( data.rol == "Profesor"){
      this.profesorService.getProfesor(data.dni).pipe(first())
    .subscribe(
      data => {
        var profesor =   JSON.parse(data['profesor']);
        Array.prototype.forEach.call(profesor, moduloInfo => {
          this.moduloUserList.set(moduloInfo.moduloCodigo, moduloInfo.nombreModulo);
        });
        this.modulo.setValue(Array.from( this.moduloUserList.keys() ))
        this.formGroupProfesor.setValue(profesor[0].departamento); 
      },
     
      error => {
        if (error.status == 401 && error.error.errors == "Sesión expirada") {
          AppComponent.myapp.openDialogSesion();
        }
        else if (error.status == 406) {
          const res = new Array();
          res.push("Petición incorrecta.");
          AppComponent.myapp.openDialog(res);
        }
      });
    }
    else if(data.rol == "Tutor_empresa"){
     this.tutorService.getTutor(data.dni).pipe(first())
     .subscribe(
      data => {
        
        var tutor =   JSON.parse(data['tutor']);
        Array.prototype.forEach.call(tutor, moduloInfo => {
          this.moduloUserList.set(moduloInfo.moduloCodigo, moduloInfo.nombreModulo);
        });
        this.modulo.setValue(Array.from( this.moduloUserList.keys() ))
        this.formGroupTutor.setValue(tutor[0].moduloEmpresa); 
        console.log(tutor[0])
        this.cifEmpresa = tutor[0].CIF;
      },
     
      error => {
        if (error.status == 401 && error.error.errors == "Sesión expirada") {
          AppComponent.myapp.openDialogSesion();
        }
        else if (error.status == 406) {
          const res = new Array();
          res.push("Petición incorrecta.");
          AppComponent.myapp.openDialog(res);
        }
      });
    }
    
  }
  
  ngOnInit(): void {
    
      this.moduloService.getModulos(this.formInstance.value.fpDual).pipe(first())
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
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
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
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
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
      codigoCentro: this.formInstance.value.codigoCentro,
      fpDual: this.formInstance.value.fpDual,
      rol: this.formInstance.value.rol,
      dni: this.formInstance.value.dni
    };
    if (this.numero == "Administrador" || this.numero == 'Administrador de Centro') {
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
            else if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }

    else if (this.numero == 'Alumno') {
      
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
               if (errorInfo.param == "numeroExpediente"){
              this.numeroExpediente.setErrors({
                serverError: errorInfo.message
              });  
            }else if (errorInfo.param == "modulo"){
              this.modulo.setErrors({
                serverError: errorInfo.message
              });  
            }

              });
            }
            else if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 'Profesor') {

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
                if (errorInfo.param == "departamento"){
                  this.formGroupProfesor.setErrors({
                    serverError: errorInfo.message
                  });  
                }else if (errorInfo.param == "modulo"){
                  this.modulo.setErrors({
                    serverError: errorInfo.message
                  });  
                }
              });
            } else if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 'Tutor_empresa') {
      
      var formGroupTutorJSON = {
        moduloEmpresa: this.formGroupTutor.value, 
        cifEmpresa: this.cifEmpresa
      }
      this.tutorService.updateTutor(this.formInstance.value, userJson, formGroupTutorJSON, this.modulo.value).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            console.log(error)
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 409) {
              error.error.errors.forEach(errorInfo => {
                const formControl = this.formInstance.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                }else if (errorInfo.param == "modulo"){
                  this.modulo.setErrors({
                    serverError: errorInfo.message
                  });  
                }
              });
            }
          });
    }



  }

}
