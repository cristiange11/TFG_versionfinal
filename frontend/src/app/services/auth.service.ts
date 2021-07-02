import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";
  
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userDni: Pick<User, "dni">;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router ) { 
    
  }

  signup(user: User): Observable<User>{
    console.log(user);
    return this.http.post<User>(`${this.url}/signup`, user , this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }
  login(
    dni: Pick<User, "dni">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userDni: Pick<User, "dni">;
  }> {
    return this.http
      .post(`${this.url}/login`, { dni, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userDni: Pick<User, "dni"> }) => {
          this.userDni = tokenObject.userDni;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["adminpage"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userDni: Pick<User, "dni">;
          }>("login")
        )
      );
  }
}
