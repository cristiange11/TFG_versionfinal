import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fpduales } from '../models/Fpduales';

@Injectable({
  providedIn: 'root'
})
export class FpdualesService {
  private url = "http://3.140.131.165:3000/fpduales";

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) {
  }
  //Método que llama al back-end para obtener un FP dual
  getFPdual(id: number): Observable<Fpduales[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Fpduales[]>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para obtener los FPs asociados a un centro
  getFPsByCentro(codigoCentro: number): Observable<Fpduales[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Fpduales[]>(`${this.url}/adminCentro/${codigoCentro}`, httpOptions);
  }
  //Método que llama al back-end para obtener los FP duales que tengan como mínimo 1 plaza disponible
  getFPdualByAlumno(codigoCentro: number): Observable<Fpduales[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Fpduales[]>(`${this.url}/alumno/${codigoCentro}`, httpOptions);
  }
  //Método que llama al back-end para eliminar todo lo asociado al FP
  deleteUsuariosByFP(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/delete/${id}`, httpOptions);
  }
  //Método que llama al back-end para obtener los FP duales
  getFps(): Observable<Fpduales[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Fpduales[]>(this.url, httpOptions);
  }
  //Método que llama al back-end para obtener un FP
  getFp(id): Observable<Fpduales> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Fpduales>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para crear un FP
  addFp(fpDual: Fpduales): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, fpDual, httpOptions);
  }
  //Método que llama al back-end para eliminar un FP
  deleteFp(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para actualizar un FP
  updateFp(fpDual: Fpduales): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, fpDual, httpOptions);
  }

}
