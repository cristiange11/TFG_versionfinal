import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ : BehaviorSubject<User>;
  public user: Observable<User>;
  userDni: Pick<User, "dni">;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  
  constructor(private cookieService: CookieService, private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
    this.isUserLoggedIn$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.isUserLoggedIn$.asObservable();
  }

  signup(user: User): Observable<JSON>{
    console.log("HTTP OPTIONS + ",this.httpOptions.headers);
    console.log('SIGNUPPPP:'+this.cookieService.get('token'));
    return this.http.post<JSON>(  `${this.url}/signup`, user , this.httpOptions);
    
  }
  login( dni: Pick<User, "dni">, password: Pick<User, "password">): Observable<JSON> {
    console.log('LOGIIIIIIN');
    return this.http.post<JSON>(`${this.url}/login`, { dni, password }, this.httpOptions);   
  }
  updateUsuario(editForm , userJson): Observable<JSON>{
    
    var user = {
      dni : userJson.dni,
      nombre: editForm.nombre,
      apellidos: editForm.apellidos,
      correo: editForm.correo,
      movil: editForm.movil,
      direccion: editForm.direccion,
      password: editForm.password,
      genero: editForm.genero,
      cp: editForm.cp,
      rol: userJson.rol,
      fechaNacimiento: editForm.fechaNacimiento,
      fpDual: userJson.fpDual,
      codigoCentro: userJson.codigoCentro
    };
    
    return this.http.put<JSON>(`${this.url}/update`, user, this.httpOptions);
  }
}
