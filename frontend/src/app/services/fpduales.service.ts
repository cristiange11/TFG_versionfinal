import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fpduales } from '../models/Fpduales';

@Injectable({
  providedIn: 'root'
})
export class FpdualesService {
  private url = "http://localhost:3000/fpduales";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json"}),
  }
  constructor(private http: HttpClient, private router: Router ) { 
  }
  getFPdual(codigo: string): Observable<Fpduales [] >{
    let params = new HttpParams().set("codigo_centro",codigo)
    console.log(params)
    return this.http.get<Fpduales []>(`${this.url}/ByCentro`,{ params: params})
   
  }
}
