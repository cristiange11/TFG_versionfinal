import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private url = "http://localhost:3000/encuesta";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getEncuestas(codigoModulo : number): Observable<Encuesta[] >{    
    return this.http.get<Encuesta[]>(`${this.url}/${codigoModulo}`,  this.httpOptions); 
  }
  addEncuesta(encuesta : Encuesta): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/create`, encuesta , this.httpOptions);
  }
  deleteEncuesta(id): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${id}`,  this.httpOptions);
  }
  updateEncuesta(encuesta : Encuesta): Observable<JSON>{
    return this.http.put<JSON>(`${this.url}/update`, encuesta, this.httpOptions);
  }
}