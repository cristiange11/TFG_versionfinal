import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { TutorEmpresa } from "../models/TutorEmpresa";

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {
  private url = "http://localhost:3000/tutor";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private router: Router) { }
  createTutor(formulario1 , formulario2): Observable<TutorEmpresa>{    
    var tutor = new TutorEmpresa(formulario1, formulario2);
    return this.http.post<TutorEmpresa>(`${this.url}/create`, tutor , this.httpOptions)   
  }
}
