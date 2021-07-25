import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from 'src/app/models/Centro';
import {CentroService} from '../../../../services/centro.service';
import { AppComponent } from '../../../../app.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro-update',
  templateUrl: './centro-update.component.html',
  styleUrls: ['./centro-update.component.css']
})
export class CentroUpdateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(private router: Router, private cookieService: CookieService, public dialogRef: MatDialogRef< CentroUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Centro, public centroService: CentroService) { 
      this.formInstance = new FormGroup({
        nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
        provincia: new FormControl("", [Validators.required, Validators.minLength(4)]),
        direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        CP: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
        telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
        correo: new FormControl("", [Validators.required, Validators.email]),
        codigoCentro: new FormControl("", []),
      })
      this.formInstance.setValue(data);
    }

  ngOnInit(): void {
   
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      var user =(JSON.parse(this.cookieService.get('user')));
    if(Number(user.rol)!=1){
      this.router.navigate(['home']);
    }
    
    }

  }
  save(){
   
    this.centroService.updateCentro(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
         
          
          if(error.status == 409){
            
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
            this.dialogRef.close();                             
            AppComponent.myapp.openDialogSesion();
          }
          else if(error.status == 401){
            const res = new Array();
          res.push("No se ha podido crear.");
          AppComponent.myapp.openDialog(res);
          this.dialogRef.close();
          }
        });
    
      

  }

}
