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
    
  }

  signup(sigunForm, userJson): Observable<JSON>{
    console.log("HTTP OPTIONS + ",this.httpOptions.headers);
    console.log('SIGNUPPPP:'+this.cookieService.get('token'));
    var user = {
      dni : sigunForm.dni,
      nombre: sigunForm.nombre,
      apellidos: sigunForm.apellidos,
      correo: sigunForm.correo,
      movil: sigunForm.movil,
      direccion: sigunForm.direccion,
      password: sigunForm.password,
      genero: sigunForm.genero,
      cp: sigunForm.cp,
      rol: sigunForm.rol,
      fechaNacimiento: sigunForm.fechaNacimiento,
      fpDual: userJson.fpDual == '' ? null : userJson.fpDual,
      codigoCentro: userJson.codigoCentro == '' ? null : userJson.codigoCentro
    };
    console.log("Usuario => " + JSON.stringify(user))
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
    console.log("User => " + user.dni)
    return this.http.put<JSON>(`${this.url}/update`, user, this.httpOptions);
  }
  updateUserForm(user: User): Observable<JSON>{
    
    return this.http.put<JSON>(`${this.url}/update`, user, this.httpOptions);
  }
  getUsers(): Observable<JSON[] >{    
    return this.http.get<JSON[]>(this.url, this.httpOptions); 
  }
  deleteUser(dni: string): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${dni}`,  this.httpOptions);
  }
}
