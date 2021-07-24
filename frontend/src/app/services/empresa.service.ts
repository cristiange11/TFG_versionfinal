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

  constructor(private cookieService: CookieService, private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { }
  getEmpresas(): Observable<Empresa[] >{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.get<Empresa []>(this.url, httpOptions);
  }
  addEmpresa(empresa : Empresa): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.post<JSON>(`${this.url}/create`, empresa , httpOptions);
  }
  deleteEmpresa(cifEmpresa : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.delete<JSON>(`${this.url}/${cifEmpresa}`,  httpOptions);
  }
  updateEmpresa(empresa : Empresa): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.put<JSON>(`${this.url}/update`, empresa, httpOptions);
  }
  deleteTutorEmpresaByEmpresa(cifEmpresa : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),}
    return this.http.delete<JSON>(`${this.url}/delete/${cifEmpresa}`,  httpOptions);
  }

}
