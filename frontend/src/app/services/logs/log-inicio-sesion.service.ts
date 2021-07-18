import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LogInicioSesion } from 'src/app/models/Log/LogInicioSesion';

@Injectable({
  providedIn: 'root'
})
export class LogInicioSesionService {
  private url = "http://localhost:3000/log/inicioSesion";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient,  private router: Router, private cookieService: CookieService ) { 
  }
  getSesiones(): Observable<LogInicioSesion[] >{    
    return this.http.get<LogInicioSesion[]>(this.url, this.httpOptions); 
  }
}
