import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ResultadoAprendizaje } from '../models/ResultadoAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeService {
  private url = "http://3.140.131.165:3000/resultadoaprendizaje";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  //Método que llama al back-end para obtener los resultados de aprendizaje de un módulo
  getResultadoAprendizaje(codigoModulo: number): Observable<ResultadoAprendizaje[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<ResultadoAprendizaje[]>(`${this.url}/${codigoModulo}`, httpOptions);
  }
  //Método que llama al back-end para crear un resultado de aprendizaje
  addResultadoAprendizaje(resultadoAprendizaje: ResultadoAprendizaje): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, resultadoAprendizaje, httpOptions);
  }
  //Método que llama al back-end para eliminar un resultado de aprendizaje
  deleteResultadoAprendizaje(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para actualizar un resultado de aprendizaje
  updateResultadoAprendizaje(resultadoAprendizaje: ResultadoAprendizaje): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, resultadoAprendizaje, httpOptions);
  }
}
