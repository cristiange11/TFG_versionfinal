import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = "http://3.140.131.165:3000/roles";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  //Método que llama al back-end para obtener los roles
  getRoles(): Observable<Rol[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<Rol[]>(this.url, httpOptions);


  }
}
