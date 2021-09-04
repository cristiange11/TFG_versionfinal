import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Modulo } from '../models/Modulo';
@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private url = "http://3.140.131.165:3000/modulo";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  //Método que llama al back-end para obtener los módulos
  getModulos(fpDual: number): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/${fpDual}`, httpOptions);
  }
  //Método que llama al back-end para obtener los módulos asociados al profesor
  getModulosProf(dni: string): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/profesor/${dni}`, httpOptions);
  }
  //Método que llama al back-end para obtener los módulos asociados al tutor
  getModulosTut(dni: string): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/tutor/${dni}`, httpOptions);
  }
  //Método que llama al back-end para obtener los módulos asociados al alumno
  getModulosAlum(dni: string): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/alumno/${dni}`, httpOptions);
  }
  //Método que llama al back-end para obtener los módulos que el alumno no haya aprobado
  getModulosAlumUpdate(dni: string, fpDual): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/alumno/modulo/${dni}/${fpDual}`, httpOptions);
  }
  //Método que llama al back-end para crear un módulo
  addModulo(modulo: Modulo): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, modulo, httpOptions);
  }
  //Método que llama al back-end para borrar un módulo
  deleteModulo(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para eliminar todo lo asociado al módulo
  deleteAllByModulo(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/modulo/${id}`, httpOptions);
  }
  //Método que llama al back-end para actualizar un módulo
  updateModulo(modulo: Modulo): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, modulo, httpOptions);
  }
}
