import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Centro } from 'src/app/models/Centro';
import { CentroService } from 'src/app/services/centro.service';

@Component({
  selector: 'app-centro-create',
  templateUrl: './centro-create.component.html',
  styleUrls: ['./centro-create.component.css']
})
export class CentroCreateComponent implements OnInit {
  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef< CentroCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Centro, public centroService: CentroService) { 
      this.formInstance = new FormGroup({
        nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
        provincia: new FormControl("", [Validators.required, Validators.minLength(4)]),
        direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        CP: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
        telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
        correo: new FormControl("", [Validators.required, Validators.email]),
        codigo_centro: new FormControl("", [Validators.required, Validators.minLength(4)]),
      })
      //this.formInstance.setValue(data);
    }
    

  ngOnInit(): void {
  }
  save(){
    console.log(this.formInstance.value);
    this.centroService.addCentro(this.formInstance.value).pipe(first())
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
    
    this.dialogRef.close(Object.assign(new Centro(), this.formInstance.value));
  }
}
