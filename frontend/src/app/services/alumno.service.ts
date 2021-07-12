import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { Alumno } from "../models/Alumno";
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url = "http://localhost:3000/alumno";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private router: Router) { }
  createAlumno(formulario1 , formulario2): Observable<JSON>{   
    var alumno = new Alumno(formulario1, formulario2);
    
    return this.http.post<JSON>(`${this.url}/create`, alumno , this.httpOptions)   
  }
}
