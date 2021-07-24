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
  
  
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  createTutor(sigunForm , userJson,  formulario2, modulo): Observable<JSON>{    
    var tutor = {
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
      codigoCentro: userJson.codigoCentro, 
      moduloEmpresa: formulario2.moduloEmpresa,
      cifEmpresa: formulario2.cifEmpresa,
      modulo : {modulo : modulo}
    };
    console.log(tutor)
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.post<JSON>(`${this.url}/create`, tutor , httpOptions);   
  }
}
