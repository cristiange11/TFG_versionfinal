import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ : BehaviorSubject<User>;
  public user: Observable<User>;
  userDni: Pick<User, "dni">;
  httpOptions1: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private cookieService: CookieService, private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
    this.isUserLoggedIn$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.isUserLoggedIn$.asObservable();
  }

  signup(user: User): Observable<JSON>{
    console.log(this.cookieService.get('token'));
    return this.http.post<JSON>(  `${this.url}/signup`, user , this.httpOptions1)
    
  }
  login( dni: Pick<User, "dni">, password: Pick<User, "password">): Observable<JSON> {
    
    return this.http.post<JSON>(`${this.url}/login`, { dni, password }, this.httpOptions)
      
  }
}
