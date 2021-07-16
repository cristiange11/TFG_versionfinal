import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css']
})
export class EmpresaUpdateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< EmpresaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa, public empresaService: EmpresaService) {
      this.formInstance = new FormGroup({
        cifEmpresa: new FormControl("", []),
        nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
        direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
        correo: new FormControl("", [Validators.required, Validators.email]),
        url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]),
      });
      this.formInstance.setValue(data);
    }


  ngOnInit(): void {
  }
edit(){
  this.empresaService.updateEmpresa(this.formInstance.value).pipe(first())
  .subscribe(
    data => {
      console.log("Entro y no es error")
     window.location.reload();
    },
    error => {
      console.log(error)
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

  

}
}

