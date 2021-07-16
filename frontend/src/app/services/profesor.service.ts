import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
import { Profesor } from "../models/Profesor";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private url = "http://localhost:3000/profesor";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  createProfesor(sigunForm , userJson, formulario2): Observable<JSON>{  
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
      fpDual: userJson.fpDual,
      codigoCentro: userJson.codigoCentro 
    };  
    var profesor = new Profesor(user, formulario2);   
    return this.http.post<JSON>(`${this.url}/create`, profesor , this.httpOptions);   
  }
}
