import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private url = "http://localhost:3000/profesor";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  formarProfesor(sigunForm, userJson, formulario2, modulo) {
    var profesor = {
      dni: sigunForm.dni,
      nombre: sigunForm.nombre,
      apellidos: sigunForm.apellidos,
      correo: sigunForm.correo,
      movil: sigunForm.movil,
      direccion: sigunForm.direccion,
      password: sigunForm.password,
      genero: sigunForm.genero,
      cp: sigunForm.cp,
      rol: sigunForm.rol,
      fechaNacimiento: sigunForm.fechaNacimiento,
      fpDual: userJson.fpDual,
      codigoCentro: userJson.codigoCentro,
      departamento: formulario2,
      modulo: { modulo: modulo }
    };
    return profesor;
  }
  //Método que llama al back-end para crear un profesor
  createProfesor(sigunForm, userJson, formulario2, modulo): Observable<JSON> {
    var profesor = this.formarProfesor(sigunForm, userJson, formulario2, modulo);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, profesor, httpOptions);
  }
  //Método que llama al back-end para actualizar un profesor
  updateProfesor(sigunForm, userJson, formulario2, modulo): Observable<JSON> {
    var profesor = this.formarProfesor(sigunForm, userJson, formulario2, modulo);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, profesor, httpOptions);
  }
  //Método que llama al back-end para obtener un profesor
  getProfesor(dni): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON>(`${this.url}/${dni}`, httpOptions);
  }

}
