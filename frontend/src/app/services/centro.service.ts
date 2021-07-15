import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

import { Centro } from "../models/Centro";


@Injectable({
  providedIn: 'root'
})
export class CentroService {
  private url = "http://localhost:3000/centro";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient,  private router: Router, private cookieService: CookieService ) { 
  }
  getCentros(): Observable<Centro[] >{    
    return this.http.get<Centro[]>(this.url, this.httpOptions); 
  }
  addCentro(centro : Centro): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/create`, centro , this.httpOptions);
  }
  deleteCentro(codigoCentro : string): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${codigoCentro}`,  this.httpOptions);
  }
  updateCentro(centro : Centro): Observable<JSON>{
    return this.http.put<JSON>(`${this.url}/update`, centro, this.httpOptions);
  }

}
