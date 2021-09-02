import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  constructor(private cookieService: CookieService, private http: HttpClient) {

  }
  //Método que llama al back-end para registrar un usuario
  signup(sigunForm, userJson): Observable<JSON> {
    var user = {
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
      fpDual: userJson.fpDual == '' ? null : userJson.fpDual,
      codigoCentro: userJson.codigoCentro == '' ? null : userJson.codigoCentro
    };
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }

    return this.http.post<JSON>(`${this.url}/signup`, user, httpOptions);

  }
  //Método que llama al back-end para comprobar el inicio de sesión
  login(dni, password): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/login`, { dni, password }, httpOptions);
  }
  //Método que llama al back-end para actualizar un usuario
  updateUsuario(editForm, userJson): Observable<JSON> {

    var user = {
      dni: userJson.dni,
      nombre: editForm.nombre,
      apellidos: editForm.apellidos,
      correo: editForm.correo,
      movil: editForm.movil,
      direccion: editForm.direccion,
      password: editForm.password,
      genero: editForm.genero,
      cp: editForm.cp,
      rol: userJson.rol,
      fechaNacimiento: editForm.fechaNacimiento,
      fpDual: userJson.fpDual == '' ? null : userJson.fpDual,
      codigoCentro: userJson.codigoCentro == '' ? null : userJson.codigoCentro,
      actualPassword: editForm.actualPassword != '' ? editForm.actualPassword : null,
    };
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, user, httpOptions);
  }
  //Método que llama al back-end para obtener los alumnos de un centro
  getUsersByCentro(codigoCentro): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/${codigoCentro}`, httpOptions);
  }
  //Método que llama al back-end para obtener los usuarios
  getUsers(): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        "Authorization": this.cookieService.get('token'),
        "Content-Type": "application/json", "X-Frame-Options": "deny"
      }),
    }
    return this.http.get<JSON[]>(this.url, httpOptions);
  }
  //Método que llama al back-end para eliminar un usuario
  deleteUser(dni: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${dni}`, httpOptions);
  }
  //Método que llama al back-end para eliminar todo lo asociado al usuario
  deleteLogByUser(dni: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/usuario/${dni}`, httpOptions);
  }
  //Método que llama al back-end para enviar un correo al usuario para cambiar la contraseña
  recoveryPassword(correo: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/recovery`, correo, httpOptions);
  }
  //Método que llama al back-end para cambiar la contraseña
  updatePassword(password: string): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/updatePassword`, password, httpOptions);
  }
}
