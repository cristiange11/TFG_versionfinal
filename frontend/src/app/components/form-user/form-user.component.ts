import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  signupForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signupForm=this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      dni: new FormControl("",[Validators.required, Validators.pattern("/^\d{8}[a-zA-Z]$/")]),
      nombre: new FormControl("",[Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("",[Validators.required]),
      genero: new FormControl("",[Validators.required]),
      cp: new FormControl("",[Validators.required, Validators.pattern("/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/")]),
      apellidos: new FormControl("",[Validators.required, Validators.minLength(4)]),
      rol: new FormControl("",[Validators.required]),
      fecha_nacimiento: new FormControl("",[Validators.required, Validators.pattern("/^\d{1,2}\.\d{1,2}\.\d{4}$/")]),
      codigo_centro: new FormControl("",[Validators.required]),
      nombre_usuario: new FormControl("",[Validators.required, Validators.minLength(4)]),
      correo: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(6)]),
      movil: new FormControl("",[Validators.required, Validators.pattern("\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}")])
      
    });
  }
  signup(): void{
    console.log(this.signupForm.value);
  }
}
