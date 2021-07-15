import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from 'src/app/models/Centro';
import {CentroService} from '../../../services/centro.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-centro-update',
  templateUrl: './centro-update.component.html',
  styleUrls: ['./centro-update.component.css']
})
export class CentroUpdateComponent implements OnInit {
  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef< CentroUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Centro, public centroService: CentroService) { 
      this.formInstance = new FormGroup({
        nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
        provincia: new FormControl("", [Validators.required, Validators.minLength(4)]),
        direccion: new FormControl("", [Validators.required, Validators.minLength(4)]),
        CP: new FormControl("", [Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
        telefono: new FormControl("", [Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}$/)]),
        correo: new FormControl("", [Validators.required, Validators.email]),
        codigo_centro: new FormControl("", []),
      })
      this.formInstance.setValue(data);
    }

  ngOnInit(): void {
    

  }
  save(){
    console.log(this.formInstance.hasError);
    this.centroService.updateCentro(this.formInstance.value).pipe(first())
      .subscribe(
        data => {
         window.location.reload();
        },
        error => {
          const res = new Array();
          res.push("No se ha podido actualizar.");
          AppComponent.myapp.openDialog(res);
        });
    
    this.dialogRef.close(Object.assign(new Centro(), this.formInstance.value));
  }

}
