import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { Alumno } from "../models/Alumno";
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url = "http://localhost:3000/alumno";

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  createAlumno(sigunForm, userJson, formulario2): Observable<JSON> {
    var user = {
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
      codigoCentro: userJson.codigoCentro
    };

    var alumno = new Alumno(user, formulario2)
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }

    return this.http.post<JSON>(`${this.url}/create`, alumno, httpOptions);
  }
  updateAlumno(sigunForm, userJson, formulario2, modulo): Observable<JSON> {
    var alumno = {
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
      numeroExpediente: formulario2,
      modulo: { modulo: modulo }
    };

    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, alumno, httpOptions);
  }
  getAlumno(dni): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/${dni}`, httpOptions);
  }
  /*getAlumnoByModulo(codigoModulo): Observable<JSON> {
    console.log(codigoModulo);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/modulo/${codigoModulo}`, httpOptions);
  }*/
  getAlumnoByModuloWithoutMark(codigoModulo): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/modulo/${codigoModulo}`, httpOptions);
  }
}
