import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { Centro } from "../models/Centro";
import { ErrorHandlerService } from "./error-handler.service";
@Injectable({
  providedIn: 'root'
})
export class CentroService {
  private url = "http://localhost:3000/centro";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
  }
  getCentros(): Observable<Centro[] >{
    
    return this.http.get<Centro[]>(this.url)
   
  }
}
