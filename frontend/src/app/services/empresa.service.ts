import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { Empresa } from "../models/Empresa";
import { ErrorHandlerService } from "./error-handler.service";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = "http://localhost:3000/empresa";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { }
  getEmpresas(): Observable<Empresa[] >{
    return this.http.get<Empresa []>(this.url, this.httpOptions);
  }
  addEmpresa(empresa : Empresa): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/create`, empresa , this.httpOptions);
  }
  deleteEmpresa(cifEmpresa : string): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/${cifEmpresa}`,  this.httpOptions);
  }
  updateEmpresa(empresa : Empresa): Observable<JSON>{
    return this.http.put<JSON>(`${this.url}/update`, empresa, this.httpOptions);
  }
  deleteTutorEmpresaByEmpresa(cifEmpresa : string): Observable<JSON>{
    return this.http.delete<JSON>(`${this.url}/delete/${cifEmpresa}`,  this.httpOptions);
  }

}
