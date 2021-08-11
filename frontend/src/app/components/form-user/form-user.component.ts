import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CentroService } from 'src/app/services/centro.service';
import { RolService } from 'src/app/services/rol.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FpdualesService } from 'src/app/services/fpduales.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TutorEmpresaService } from 'src/app/services/tutor-empresa.service';
import { Fpduales } from 'src/app/models/Fpduales';
import { Empresa } from 'src/app/models/Empresa';
import { AppComponent } from '../../app.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModuloService } from 'src/app/services/modulo.service';
import { NavigationComponent } from '../navigation/navigation.component';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  hide2 = true;
  numero = -1;
  formGroupTutor;
  numeroExpediente;
  formGroupProfesor;
  modulo;
  user;
  passwordFormControl = new FormControl("", [Validators.required, Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]);
  codigoCentro = new FormControl("", [Validators.required]);
  fpDual = new FormControl("", [Validators.required]);
  confirmPasswordFormControl = new FormControl("", [Validators.required, this.checkConfirmPassword()]);
  moduloList = new Map<number, string>();
  centroList = new Map<string, string>();
  rolesList = new Map<number, string>();
  fpList = new Map<number, string>();
  empresaList = new Map<number, string>();
  constructor(private nagivationComponent: NavigationComponent, private moduloService: ModuloService, private cookieService: CookieService, private router: Router, private appRouting: AppRoutingModule, private authService: AuthService, private tutorService: TutorEmpresaService, private profesorService: ProfesorService, private alumnoService: AlumnoService, private empresaService: EmpresaService, private centroService: CentroService, private rolService: RolService, private fpdualesService: FpdualesService) {
    document.body.style.background = "linear-gradient(to right, #1dcd9b, #00d4ff)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  ngOnInit(): void {
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.router.navigate(['home']);
      }
    }
    if (this.user.rol == 1) {
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
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
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
          });
    }
    this.rolService.getRoles().pipe(first())
      .subscribe(
        data => {
          this.rolesList = new Map<number, string>();
          let rol = data["roles"]
          rol.forEach(rolInfo => {
            if (this.user.rol == 2 && rolInfo.id != 1 && rolInfo.id != 2) {
              this.rolesList.set(rolInfo.id, rolInfo.nombreRol);
            } else if (this.user.rol == 1) {
              this.rolesList.set(rolInfo.id, rolInfo.nombreRol);
            }
          });
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });

    this.signupForm = this.createFormGroup();

  }

  createFormGroup(): FormGroup {
    const res = new FormGroup({
      dni: new FormControl("", [Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
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
    if (this.user.rol == 2) {
      this.codigoCentro.setValue(this.user.codigoCentro);
      this.obtenerFP(this.user.codigoCentro);
    }
    return res;
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
    if (rol == 5) {
      this.numeroExpediente = new FormControl("", [Validators.required, Validators.minLength(6)]);
    }
    else if (rol == 4) {
      this.formGroupProfesor = new FormControl("", [Validators.required, Validators.minLength(6)]);
      this.modulo = new FormControl("", [Validators.required]);
    } else if (rol == 3) {

      this.modulo = new FormControl("", [Validators.required]);
      this.formGroupTutor = new FormGroup({ moduloEmpresa: new FormControl("", [Validators.required, Validators.minLength(6)]), idEmpresa: new FormControl("", [Validators.required]) })
      this.empresaService.getEmpresasByFp(this.user.fpDual).pipe(first())
        .subscribe(
          data => {
            this.empresaList = new Map<number, string>();
            let empresas = data["empresas"]
            empresas.forEach(empresaInfo => {
              var empresa = empresaInfo as Empresa
              this.empresaList.set(empresa.id, empresa.nombre)
            });
          },
          error => {

            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });



    }
    return this.numero;
  }
  obtenerModuloAndEmpresa(fp): void {
    this.empresaService.getEmpresasByFp(fp).pipe(first())
      .subscribe(
        data => {
          this.empresaList = new Map<number, string>();
          let empresas = data["empresas"]
          empresas.forEach(empresaInfo => {
            var empresa = empresaInfo
              console.log("EMRPESA " + empresa)
            this.empresaList.set(empresa.id, empresa.nombre)
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
          else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
    this.obtenerModulo(fp);
  }
  obtenerModulo(fp): void {

    this.moduloService.getModulos(fp).pipe(first())
      .subscribe(
        data => {
          this.moduloList = new Map<number, string>();
          let modulos = data["modulos"]
          modulos.forEach(moduloInfo => {
            var modulo = moduloInfo

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
          else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  obtenerFP(centro): void {

    if (this.numero != 5) {
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
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else {
      this.fpdualesService.getFPdualByAlumno(centro).pipe(first())
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
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });

    }
  }
  signup(): void {
    var userJson = {
      codigoCentro: this.codigoCentro.value,
      fpDual: this.fpDual.value,
    };

    if (this.numero == 1 || this.numero == 2) {

      this.authService.signup(this.signupForm.value, userJson).pipe(first())
        .subscribe(
          data => {

            var arrayRes = new Array();
            arrayRes.push("Usuario registrado correctamente");
            AppComponent.myapp.openDialog(arrayRes);
          },
          error => {
            if(error.status == 409 && error.error.errors == "no se ha podido crear el usuario"){
              const res = new Array();
              res.push("No se ha podido crear el usuario.");
              AppComponent.myapp.openDialog(res);
            }
            if (error.status == 409) {

              error.error.errors.forEach(errorInfo => {
                const formControl = this.signupForm.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                }
              });
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }

    else if (this.numero == 5) {

      this.alumnoService.createAlumno(this.signupForm.value, userJson, this.numeroExpediente.value).pipe(first())
        .subscribe(
          data => {

            var arrayRes = new Array();
            arrayRes.push("Usuario registrado correctamente");
            AppComponent.myapp.openDialog(arrayRes);
          },
          error => {
            if(error.status == 409 && error.error.errors == "no se ha podido crear el alumno"){
              const res = new Array();
              res.push("No se ha podido crear el alumno.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 409) {
              error.error.errors.forEach(errorInfo => {
                const formControl = this.signupForm.get(errorInfo.param);
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
                else if (errorInfo.param == "fpDual") {
                  this.fpDual.setErrors({
                    serverError: errorInfo.message
                  });
                }
                else if (errorInfo.param == "codigoCentro") {
                  this.codigoCentro.setErrors({
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
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 4) {

      this.profesorService.createProfesor(this.signupForm.value, userJson, this.formGroupProfesor.value, this.modulo.value).pipe(first())
        .subscribe(
          data => {
            var arrayRes = new Array();
            arrayRes.push("Usuario registrado correctamente");
            AppComponent.myapp.openDialog(arrayRes);
          },
          error => {
            if(error.status == 409 && error.error.errors == "no se ha podido crear el profesor"){
              const res = new Array();
              res.push("No se ha podido crear el profesor.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 409) {
              error.error.errors.forEach(errorInfo => {
                const formControl = this.signupForm.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                }
                else if (errorInfo.param == "modulo") {
                  this.modulo.setErrors({
                    serverError: errorInfo.message
                  });
                } else if (errorInfo.param == "fpDual") {
                  this.fpDual.setErrors({
                    serverError: errorInfo.message
                  });
                } else if (errorInfo.param == "formGroupProfesor") {
                  this.formGroupProfesor.setErrors({
                    serverError: errorInfo.message
                  });
                }
                else if (errorInfo.param == "codigoCentro") {
                  this.codigoCentro.setErrors({
                    serverError: errorInfo.message
                  });
                }
              });
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    } else if (this.numero == 3) {

      this.tutorService.createTutor(this.signupForm.value, userJson, this.formGroupTutor.value, this.modulo.value).pipe(first())
        .subscribe(
          data => {
            var arrayRes = new Array();
            arrayRes.push("Usuario registrado correctamente");
            AppComponent.myapp.openDialog(arrayRes);
          },
          error => {
            if(error.status == 409 && error.error.errors == "no se ha podido crear el tutor"){
              const res = new Array();
              res.push("No se ha podido crear el tutor.");
              AppComponent.myapp.openDialog(res);
            }
            if (error.status == 409) {
              error.error.errors.forEach(errorInfo => {
                const formControl = this.signupForm.get(errorInfo.param);
                if (formControl) {
                  formControl.setErrors({
                    serverError: errorInfo.message
                  });
                } else if (errorInfo.param == "modulo") {
                  this.modulo.setErrors({
                    serverError: errorInfo.message
                  });
                } else if (errorInfo.param == "fpDual") {
                  this.fpDual.setErrors({
                    serverError: errorInfo.message
                  });
                } else if (errorInfo.param == "formGroupProfesor") {
                  this.formGroupProfesor.setErrors({
                    serverError: errorInfo.message
                  });
                }
                else if (errorInfo.param == "codigoCentro") {
                  this.codigoCentro.setErrors({
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
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }

  }
  getErrorMessage(attribute: String) {

    if (attribute == "dni") {
      let dni = this.signupForm.get("dni")
      return dni.hasError('required') ? 'Introduce un DNI' :
        dni.hasError('pattern') ? 'Formato incorrecto' :
          '';
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
        direccion.hasError('minlength') ? 'Longitud mínima de 4' :
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
        correo.hasError('email') ? 'Formato correo incorrecto' : '';
    } else if (attribute == "fechaNacimiento") {
      let fechaNacimiento = this.signupForm.get("fechaNacimiento");
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
    } else if (attribute == "rol") {
      let rol = this.signupForm.get("rol");
      return rol.hasError('required') ? 'Selecciona un rol' :
        '';
    } else if (attribute == "codigoCentro") {
      return this.codigoCentro.hasError('required') ? 'Selecciona un centro' :
        '';
    } else if (attribute == "fpDual") {
      return this.fpDual.hasError('required') ? 'Selecciona un FP dual' :
        '';
    } else if (this.numero == 5) {
      let err = this.numeroExpediente;
      return err.hasError('required') ? 'Añade el campo' :
        err.hasError('minlength') ? 'Cadena mínima de 6 caracteres' :
          '';
    } else if (this.numero == 4) {
      let err = this.formGroupProfesor;
      return err.hasError('required') ? 'Añade el campo' :
        err.hasError('minlength') ? 'Cadena mínima de 6 caracteres' :
          '';
    }
    else if (this.numero == 3 && attribute == "moduloEmpresa") {
      let err = this.formGroupTutor.get("moduloEmpresa")
      return err.hasError('required') ? 'Añade el campo' :
        err.hasError('minlength') ? 'Cadena mínima de 6 caracteres' :
          '';
    } else if (this.numero == 3 && attribute == "idEmpresa") {
      let err = this.formGroupTutor.get("idEmpresa")
      return err.hasError('required') ? 'Añade el campo' :
        '';
    }
    return false;
  }
}
