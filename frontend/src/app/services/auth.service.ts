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

  
  constructor(private cookieService: CookieService, private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
    
  }

  signup(sigunForm, userJson): Observable<JSON>{
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
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}

    return this.http.post<JSON>(  `${this.url}/signup`, user , httpOptions);
    
  }
  login( dni: Pick<User, "dni">, password: Pick<User, "password">): Observable<JSON> {
    console.log('LOGIIIIIIN');
    return this.http.post<JSON>(`${this.url}/login`, { dni, password });   
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
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}

    return this.http.put<JSON>(`${this.url}/update`, user,httpOptions);
  }
  updateUserForm(user: User): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}

    return this.http.put<JSON>(`${this.url}/update`, user, httpOptions);
  }
  getUsers(): Observable<JSON[] >{    
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}

    return this.http.get<JSON[]>(this.url, httpOptions); 
  }
  deleteUser(dni: string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}

    return this.http.delete<JSON>(`${this.url}/${dni}`,  httpOptions);
  }
}
