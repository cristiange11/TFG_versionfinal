import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private url = "http://localhost:3000/log";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }
  getLogs(): Observable<JSON[] >{   
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),} 
    return this.http.get<JSON[]>(`${this.url}`,  httpOptions); 
  }
}