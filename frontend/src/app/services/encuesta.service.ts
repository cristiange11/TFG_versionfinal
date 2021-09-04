import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private url = "http://3.140.131.165:3000/encuesta";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  //Método que llama al back-end para obtener las encuestas
  getEncuestas(codigoModulo: number): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/${codigoModulo}`, httpOptions);
  }
  //Método que llama al back-end para obtener las encuestas creadas por un tutor
  getEncuestasByTutor(dni: string, codigoModulo): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/tutor/${dni}/${codigoModulo}`, httpOptions);
  }
  //Método que llama al back-end para obtener una encuesta
  getEncuesta(id: number): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/encuesta/${id}`, httpOptions);
  }
  //Método que llama al back-end para crear una encuesta
  addEncuesta(encuesta: Encuesta): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, encuesta, httpOptions);
  }
  //Método que llama al back-end para eliminar una encuesta
  deleteEncuesta(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para actualizar una encuesta
  updateEncuesta(encuesta: Encuesta): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, encuesta, httpOptions);
  }
}
