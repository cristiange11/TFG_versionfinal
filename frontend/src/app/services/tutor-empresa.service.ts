import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { TutorEmpresa } from "../models/TutorEmpresa";

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {
  private url = "http://localhost:3000/tutor";
  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  createTutor(sigunForm , userJson,  formulario2): Observable<JSON>{    
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
    var tutor = new TutorEmpresa(user, formulario2);
    
    return this.http.post<JSON>(`${this.url}/create`, tutor , this.httpOptions);   
  }
}
