import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  returnUrl: string;
  constructor(private authService: AuthService, private router: Router) { 
    document.body.style.background="linear-gradient(to right, #e66465, #9198e5)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
  }

  ngOnInit(): void {
    this.loginForm=this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    const res=  new FormGroup({
      dni: new FormControl("",[Validators.required, Validators.pattern(/^\d{8}[a-zA-Z]$/)]),     
      password: new FormControl("",[Validators.required, Validators.minLength(6)])
      
    },
    
    );
    return res;
  }
  /*getErrorMessage(attribute: String) {
    if (attribute == "dni") {
      let dni = this.loginForm.get("dni")
      return dni.hasError('required') ? 'Introduce un DNI' :
        dni.hasError('pattern') ? 'Formato incorrecto' :
          '';
    } 

  }*/
  login(){
    this.authService.login(this.loginForm.value.dni, this.loginForm.value.password).pipe(first())
    .subscribe(
        data => {
            console.log(data);
        },
        error => {
            console.log(error);           
        });
  }
}
