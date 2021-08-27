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
  private url = "http://3.140.131.165:3000/modulo";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getModulos(fpDual : number): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/${fpDual}`,  httpOptions); 
  }
  getModulosProf(dni : string): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/profesor/${dni}`,  httpOptions); 
  }
  getModulosTut(dni : string): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/tutor/${dni}`,  httpOptions); 
  }
  getModulosAlum(dni : string): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/alumno/${dni}`,  httpOptions); 
  }
  getModulosAlumUpdate(dni : string, fpDual): Observable<JSON[] >{   
    
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),} 
    return this.http.get<JSON[]>(`${this.url}/alumno/modulo/${dni}/${fpDual}` , httpOptions); 
  }
  addModulo(modulo : Modulo): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, modulo , httpOptions);
  }
  deleteModulo(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  deleteAllByModulo(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/modulo/${id}`,  httpOptions);
  }
  updateModulo(modulo : Modulo): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, modulo, httpOptions);
  }
}
