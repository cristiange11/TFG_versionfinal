import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

import { Centro } from "../models/Centro";


@Injectable({
  providedIn: 'root'
})
export class CentroService {
  private url = "http://localhost:3000/centro";

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  //Método que llama al back-end para obtener los centros
  getCentros(): Observable<Centro[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Centro[]>(this.url, httpOptions);
  }
  //Método que llama al back-end para crear un centro
  addCentro(centro: Centro): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, centro, httpOptions);
  }
  //Método que llama al back-end para borrar un centro
  deleteCentro(codigoCentro: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${codigoCentro}`, httpOptions);
  }
  //Método que llama al back-end para actualizar un centro
  updateCentro(centro: Centro): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, centro, httpOptions);
  }
  //Método que llama al back-end para eliminar todo lo asociado a un centro
  deleteUserAndFPByCentro(codigoCentro: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/delete/${codigoCentro}`, httpOptions);
  }
}
