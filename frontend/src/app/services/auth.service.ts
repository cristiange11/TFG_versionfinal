import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

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
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
    this.isUserLoggedIn$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.isUserLoggedIn$.asObservable();
  }

  signup(user: User): Observable<User>{
    
    return this.http.post<User>(`${this.url}/signup`, user , this.httpOptions)
    
  }
  login(
    dni: Pick<User, "dni">,
    password: Pick<User, "password">
  ) {
    return this.http
      .post<User>(`${this.url}/login`, { dni, password }, this.httpOptions)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.isUserLoggedIn$.next(user);
        return user;
    }));
  }
}
