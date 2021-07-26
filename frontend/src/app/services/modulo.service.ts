import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Modulo } from '../models/Modulo';
@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private url = "http://localhost:3000/modulo";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getModulos(fpDual : number): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/${fpDual}`,  httpOptions); 
  }
  addModulo(modulo : Modulo): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, modulo , httpOptions);
  }
  deleteModulo(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  updateModulo(modulo : Modulo): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, modulo, httpOptions);
  }
}
