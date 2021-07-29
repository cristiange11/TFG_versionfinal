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
  getEmpresas(): Observable<JSON[] >{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON []>(this.url, httpOptions);
  }
  getEmpresasByCentro(codigoCentro): Observable<JSON[] >{
    console.log(codigoCentro)
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON []>(`${this.url}/${codigoCentro}`, httpOptions);
  }
  getEmpresasByFp(fpDual): Observable<JSON[] >{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.get<JSON []>(`${this.url}/fp/${fpDual}`, httpOptions);
  }
  formarEmpresa(empresa, dineroBeca){
    var res= {
      dineroBeca: empresa.becas == 1 || empresa.becas=="si" ? dineroBeca : 0,
      becas : empresa.becas==1 || empresa.becas=="si" ? 1 : 0,
      cifEmpresa: empresa.cifEmpresa, empresa, 
      direccion: empresa.direccion, 
      nombre: empresa.nombre,
      telefono: empresa.telefono,
      correo: empresa.correo,
      url: empresa.url,
      plazas: empresa.plazas,
      fpDual: empresa.fpDual,
    }
    return res;
  }
  addEmpresa(empresa, dineroBeca): Observable<JSON>{
    var res= this.formarEmpresa(empresa, dineroBeca);     
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.post<JSON>(`${this.url}/create`, res , httpOptions);
  }
  deleteEmpresa(cifEmpresa : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/${cifEmpresa}`,  httpOptions);
  }
  updateEmpresa(empresa, dineroBeca): Observable<JSON>{
    var res= this.formarEmpresa(empresa, dineroBeca);
   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.put<JSON>(`${this.url}/update`, res, httpOptions);
  }
  deleteTutorEmpresaByEmpresa(cifEmpresa : string): Observable<JSON>{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json", "X-Frame-Options" : "deny"}),}
    return this.http.delete<JSON>(`${this.url}/delete/${cifEmpresa}`,  httpOptions);
  }

}
