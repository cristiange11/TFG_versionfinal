import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ResultadoAprendizajeService } from 'src/app/services/resultado-aprendizaje.service';

@Component({
  selector: 'app-resultado-aprendizaje-create',
  templateUrl: './resultado-aprendizaje-create.component.html',
  styleUrls: ['./resultado-aprendizaje-create.component.css']
})
export class ResultadoAprendizajeCreateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< ResultadoAprendizajeCreateComponent>, public resultadoAprendizajeService: ResultadoAprendizajeService) { 
    this.formInstance = new FormGroup({
      
      titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
      codigoModulo : new FormControl("",[])
    })
    this.formInstance.setValue({titulo : "", descripcion : "" , codigoModulo : Number(sessionStorage.getItem('codigoModulo'))}); 
  }
  

ngOnInit(): void {
}
save(){
  console.log(this.formInstance.value);
  this.resultadoAprendizajeService.addResultadoAprendizaje(this.formInstance.value).pipe(first())
    .subscribe(
      data => {
       window.location.reload();
      },
      error => {
        console.log(error)
        const res = new Array();
        res.push("No se ha podido crear.");
        AppComponent.myapp.openDialog(res);
      });
  
  this.dialogRef.close();
}

}
