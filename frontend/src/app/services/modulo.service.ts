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
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getModulos(fpDual : number): Observable<Modulo[] >{    
    return this.http.get<Modulo[]>(`${this.url}/${fpDual}`,  this.httpOptions); 
  }
  addModulo(modulo : Modulo): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/create`, modulo , this.httpOptions);
  }
  deleteModulo(id): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${id}`,  this.httpOptions);
  }
  updateModulo(modulo : Modulo): Observable<JSON>{
    return this.http.put<JSON>(`${this.url}/update`, modulo, this.httpOptions);
  }
}
