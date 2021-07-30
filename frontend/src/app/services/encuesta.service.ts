import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { identity } from 'angular';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private url = "http://localhost:3000/encuesta";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getEncuestas(codigoModulo : number): Observable<JSON[] >{    
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON[]>(`${this.url}/${codigoModulo}`,  httpOptions); 
  }
  getEncuesta(id : number): Observable<JSON>{    
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON>(`${this.url}/encuesta/${id}`,  httpOptions); 
  }
  addEncuesta(encuesta : Encuesta): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, encuesta , httpOptions);
  }
  deleteEncuesta(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  updateEncuesta(encuesta : Encuesta): Observable<JSON>{
    console.log(encuesta)
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, encuesta, httpOptions);
  }
}
