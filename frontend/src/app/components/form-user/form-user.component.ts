import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  hide2 = true;
  constructor(private authService: AuthService) {
    document.body.style.background="linear-gradient(to right, #1dcd9b, #00d4ff)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
    
  }

  ngOnInit(): void {
    this.signupForm=this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    const res=  new FormGroup({
      dni: new FormControl("",[Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),
      nombre: new FormControl("",[Validators.required, Validators.minLength(4)]),
      apellidos: new FormControl("",[Validators.required, Validators.minLength(4)]),
      direccion: new FormControl("",[Validators.required]),
      cp: new FormControl("",[Validators.required, Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)]),
      genero: new FormControl("",[Validators.required]),
      movil: new FormControl("",[Validators.required, Validators.pattern(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/)]),
      correo: new FormControl("",[Validators.required,Validators.email]),
      fecha_nacimiento: new FormControl("",[Validators.required,Validators.pattern(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/)]),
      rol: new FormControl("",[Validators.required]),
      codigo_centro: new FormControl("",[Validators.required]),
      fp_dual: new FormControl("",[Validators.required]),      
      password: new FormControl("",[Validators.required, Validators.minLength(6)])
      
    },
    
    );
    return res;
  }
  
  signup(): void{
    
    
    this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg));
    
  }
}

