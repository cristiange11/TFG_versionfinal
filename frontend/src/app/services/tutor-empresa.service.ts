import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {
  private url = "http://3.140.131.165:3000/tutor";


  constructor(private cookieService: CookieService, private http: HttpClient) { }
  formarTutor(sigunForm, userJson, formulario2, modulo) {
    var tutor = {
      dni: sigunForm.dni,
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
      idEmpresa: formulario2.idEmpresa,
      modulo: { modulo: modulo }
    };
    return tutor;
  }
  //Método que llama al back-end para crear un tutor
  createTutor(sigunForm, userJson, formulario2, modulo): Observable<JSON> {
    var tutor = this.formarTutor(sigunForm, userJson, formulario2, modulo);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, tutor, httpOptions);
  }
  //Método que llama al back-end para actualizar un tutor
  updateTutor(sigunForm, userJson, formulario2, modulo): Observable<JSON> {
    var tutor = this.formarTutor(sigunForm, userJson, formulario2, modulo);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, tutor, httpOptions);
  }
  //Método que llama al back-end para obtener un tutor
  getTutor(dni): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/${dni}`, httpOptions);
  }
  //Método que llama al back-end para obtener los tutores asociados a un módulo
  getTutorByModuloEncuesta(codigoModulo): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/tutor/${codigoModulo}`, httpOptions);
  }
}
