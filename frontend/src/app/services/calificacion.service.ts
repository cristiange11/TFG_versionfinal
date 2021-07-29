import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/Calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private url = "http://localhost:3000/calificacion";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getCalificaciones(codigoModulo : number): Observable<JSON[] >{    
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON[]>(`${this.url}/${codigoModulo}`,  httpOptions); 
  }
  addCalificacion(calificacion : Calificacion): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, calificacion , httpOptions);
  }
  deleteCalificacion(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  updateCalificacion(calificacion : Calificacion): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, calificacion , httpOptions);
  }
}
