import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fpduales } from '../models/Fpduales';

@Injectable({
  providedIn: 'root'
})
export class FpdualesService {
  private url = "http://localhost:3000/fpduales";
 
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router ) { 
  }
  getFPdual(id: number): Observable<Fpduales [] >{     
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json","X-Frame-Options" : "deny"}),}
    return this.http.get<Fpduales []>(`${this.url}/${id}`, httpOptions); 
  }
  getFPsByCentro(codigoCentro: number): Observable<Fpduales [] >{     
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json","X-Frame-Options" : "deny"}),}
    return this.http.get<Fpduales []>(`${this.url}/adminCentro/${codigoCentro}`, httpOptions); 
  }
  getFPdualByAlumno(codigoCentro: number): Observable<Fpduales [] >{     
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<Fpduales []>(`${this.url}/alumno/${codigoCentro}`, httpOptions); 
  }
  deleteUsuariosByFP(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/delete/${id}`,  httpOptions);
  }
  getFps(): Observable<Fpduales[] >{  
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}  
    return this.http.get<Fpduales[]>(this.url, httpOptions); 
  }
  getFp(id): Observable<Fpduales>{  
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}  
    return this.http.get<Fpduales>(`${this.url}/${id}`, httpOptions); 
  }
  addFp(fpDual : Fpduales): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, fpDual , httpOptions);
  }
  deleteFp(id): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${id}`,  httpOptions);
  }
  updateFp(fpDual : Fpduales): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, fpDual, httpOptions);
  }
  
}
