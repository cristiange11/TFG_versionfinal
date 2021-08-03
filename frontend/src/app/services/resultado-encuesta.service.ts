import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoEncuestaService {
  private url = "http://localhost:3000/resultado";

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }
  getResultados(): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(this.url, httpOptions);
  }
}
