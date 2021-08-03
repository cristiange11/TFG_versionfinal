import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = "http://localhost:3000/roles";
 
  constructor(private cookieService: CookieService, private http: HttpClient) { 
  }
  getRoles(): Observable<Rol[] >{
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization":this.cookieService.get('token'), "Content-Type" : "application/json","X-Frame-Options" : "deny"}),}
    return this.http.get<Rol[]>(this.url, httpOptions);
    
   
  }
}
