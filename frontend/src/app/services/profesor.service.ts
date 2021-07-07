import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { Profesor } from "../models/Profesor";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private url = "http://localhost:3000/profesor";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private router: Router) { }
  createProfesor(profesor: Profesor): Observable<Profesor>{    
    return this.http.post<Profesor>(`${this.url}/create`, profesor , this.httpOptions)   
  }
}
