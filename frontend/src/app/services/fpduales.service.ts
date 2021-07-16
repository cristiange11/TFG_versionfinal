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
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router ) { 
  }
  getFPdual(id: number): Observable<Fpduales [] >{     
    return this.http.get<Fpduales []>(`${this.url}/${id}`, this.httpOptions); 
  }
  deleteFPByCentro(codigoCentro : string): Observable<JSON>{
    console.log(`${this.url}/${codigoCentro}`);
    return this.http.delete<JSON>(`${this.url}/${codigoCentro}`,  this.httpOptions);
  }
  getFps(): Observable<Fpduales[] >{    
    return this.http.get<Fpduales[]>(this.url, this.httpOptions); 
  }
  addCentro(fpDual : Fpduales): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/create`, fpDual , this.httpOptions);
  }
  deleteCentro(id): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${id}`,  this.httpOptions);
  }
  updateCentro(fpDual : Fpduales): Observable<JSON>{
    return this.http.put<JSON>(`${this.url}/update`, fpDual, this.httpOptions);
  }
  
}
