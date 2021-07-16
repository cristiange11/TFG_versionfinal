import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Fpduales } from 'src/app/models/Fpduales';
import { CentroService } from 'src/app/services/centro.service';
import { FpdualesService } from 'src/app/services/fpduales.service';

@Component({
  selector: 'app-fpdual-update',
  templateUrl: './fpdual-update.component.html',
  styleUrls: ['./fpdual-update.component.css']
})
export class FpdualUpdateComponent implements OnInit {
  issueThresholdForm: FormGroup;
   fecha;
   anio;
   totalPlazas= new FormControl("", [Validators.required, Validators.min(1)]);
   plazasDisponibles =  new FormControl("", [Validators.required,  this.validateScore]);
  centroList = new Map<string, string>();
  constructor(public cookieService: CookieService, public router: Router, public dialogRef: MatDialogRef< FpdualUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fpduales, public fpdualesService: FpdualesService, public centroService: CentroService) { 
      this.fecha = new Date();
      this.anio = this.fecha.getFullYear();
      
      this.issueThresholdForm = new FormGroup({
        nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
        descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        
        anio: new FormControl("", [Validators.required , Validators.min(this.anio)]),
        totalPlazas: new FormControl("", [Validators.required, Validators.min(1)]),
        plazasDisponibles : new FormControl("", [Validators.required]),
        codigoCentro: new FormControl("", [Validators.required]),
        id: new FormControl("", []),
      }, {validators: this.validateScore})
      
      this.issueThresholdForm.setValue(data); 
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
  } 
  
 validateScore(control: AbstractControl): ValidationErrors | null {
    if (control && control.get("plazasDisponibles") && control.get("totalPlazas")) {
      const totalPlazas = control.get("totalPlazas").value;
      const plazasDisponibles = control.get("plazasDisponibles").value;  
      
      return plazasDisponibles > totalPlazas ? {  scoreError: true } : null
    }
    return null;
  }
  save(){
   
    this.fpdualesService.updateFp(this.issueThresholdForm.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          error.error.errors.forEach(errorInfo => {
            if(error.status == 409){
              
            const formControl = this.issueThresholdForm.get(errorInfo.param);
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
    
      

  }
}