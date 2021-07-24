import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ResultadoAprendizaje } from '../models/ResultadoAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeService {
  private url = "http://localhost:3000/resultadoaprendizaje";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getResultadoAprendizaje(codigoModulo : number): Observable<ResultadoAprendizaje[] >{ 
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}   
    return this.http.get<ResultadoAprendizaje[]>(`${this.url}/${codigoModulo}`,  httpOptions); 
  }
  addResultadoAprendizaje(resultadoAprendizaje : ResultadoAprendizaje): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.post<JSON>(`${this.url}/create`, resultadoAprendizaje , httpOptions);
  }
  deleteResultadoAprendizaje(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  updateResultadoAprendizaje(resultadoAprendizaje : ResultadoAprendizaje): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.put<JSON>(`${this.url}/update`, resultadoAprendizaje, httpOptions);
  }
}
