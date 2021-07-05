import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Rol } from '../models/Rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = "http://localhost:3000/roles";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
 
  constructor(private http: HttpClient, private router: Router) { 
  }
  getRoles(): Observable<Rol[] >{
    
    return this.http.get<Rol[]>(this.url)
    
   
  }
}
