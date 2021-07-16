import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
import { Alumno } from "../models/Alumno";
import { faUser } from "@fortawesome/free-solid-svg-icons";
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url = "http://localhost:3000/alumno";
  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  createAlumno(sigunForm , userJson,  formulario2): Observable<JSON>{ 
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
    
    var alumno = new Alumno(user, formulario2);
    console.log(alumno)
    return this.http.post<JSON>(`${this.url}/create`, alumno , this.httpOptions);   
  }
}
