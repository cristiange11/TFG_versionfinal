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
  empresaList = new Map<string, string>();
  constructor(private fpdualesService: FpdualesService, private centroService: CentroService, private empresaService: EmpresaService, private tutorService: TutorEmpresaService, private alumnoService: AlumnoService, private profesorService: ProfesorService, private router: Router,private rolService: RolService, private cookieService: CookieService, public dialogRef: MatDialogRef< UsuarioUpdateComponent>,
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
      this.formInstance.setValue({dni : data.dni, nombre : data.nombre, apellidos: data.apellidos, 
        direccion: data.direccion, cp: data.cp, genero: data.genero, movil: data.movil, correo: data.correo,
        fechaNacimiento: data.fechaNacimiento, rol: data.rol, password: "", confirmPassword: ""
      })
      this.user = data;}

  ngOnInit(): void {
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
       var user1 =(JSON.parse(this.cookieService.get('user')));
    if(Number(user1.rol)!=1){
      this.router.navigate(['home']);
    }
    }
    
    this.rolService.getRoles().pipe(first())
      .subscribe(
        data => {
          this.rolesList = new Map<number, string>();
          let rol = data["roles"]
          rol.forEach(rolInfo => {
            this.rolesList.set(rolInfo.id, rolInfo.nombreRol)
          });
        },
        error => {
          console.log(error.error.message);
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
            console.log(error.error.message);
          });
      this.rolService.getRoles().pipe(first())
        .subscribe(
          data => {
            this.rolesList = new Map<number, string>();
            let rol = data["roles"]
            rol.forEach(rolInfo => {
              this.rolesList.set(rolInfo.id, rolInfo.nombreRol)
            });
          },
          error => {
            console.log(error.error.message);
          });
  
      if (rol == 5) {
        this.numeroExpediente = new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]);
      } 
      else if(rol == 4){
        this.formGroupProfesor = new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]);
      }else if (rol == 3) {
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
              console.log(error.error.message);
            });
      }
      return this.numero;
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
            console.log(error.error.message);
          });
    }
  save(){
    
    
    if(this.numero==1 || this.numero==2){
    this.authService.updateUsuario(this.formInstance.value, this.user).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error)
          if(error.status==409){
            
          error.error.errors.forEach(errorInfo => {
           const formControl = this.formInstance.get(errorInfo.param);
            if (formControl) {
              formControl.setErrors({
                serverError: errorInfo.message
              });  
            }          
          });
        }
        else if(error.status == 401){
         console.log(error)
        }
        });
      }

    else if(this.numero==5){
    
      this.alumnoService.createAlumno(this.formInstance.value,  this.user, this.numeroExpediente.value).pipe(first())
      .subscribe(
        data => {
               window.location.reload();

        },
        error => {
          console.log(error)
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
            }
                
           });
        });
    }else if(this.numero==4){
      
      /*this.profesorService.createProfesor(this.formInstance.value, this.user, this.formGroupProfesor.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          
        if(error.status==409){
          
          error.error.errors.forEach(errorInfo => {
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }          
           });
          }
        });*/
    }else if(this.numero==3){
     
      this.tutorService.createTutor(this.formInstance.value, this.user, this.formGroupTutor.value).pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          error.error.errors.forEach(errorInfo => {
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }          
           });
        });
    }
    
  
    
    /*this.authService.updateUserForm(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          error.error.errors.forEach(errorInfo => {
            if(error.status == 409){
              
            const formControl = this.formInstance.get(errorInfo.param);
             if (formControl) {
               formControl.setErrors({
                 serverError: errorInfo.message
               });  
             }   

            }   else if(error.status == 401){
              
              var arrayRes= new Array();
          arrayRes.push(error.error.message);
          AppComponent.myapp.openDialog(arrayRes); 
          this.dialogRef.close();
            }   
           });
        });
    */
      

  }

}
