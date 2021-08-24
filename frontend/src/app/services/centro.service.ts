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
  
  constructor(private http: HttpClient,  private router: Router, private cookieService: CookieService ) { 
  }
  getCentros(): Observable<Centro[] >{  
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json" , "X-Frame-Options" : "deny"}),}

    return this.http.get<Centro[]>(this.url, httpOptions); 
  }
  addCentro(centro : Centro): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}

    return this.http.post<JSON>(`${this.url}/create`, centro , httpOptions);
  }
  deleteCentro(codigoCentro : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${codigoCentro}`,  httpOptions);
  }
  updateCentro(centro : Centro): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = {headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, centro, httpOptions);
  }
  deleteUserAndFPByCentro(codigoCentro : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}

    return this.http.delete<JSON>(`${this.url}/delete/${codigoCentro}`,  httpOptions);
  }
}
