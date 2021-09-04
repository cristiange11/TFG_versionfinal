import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = "http://localhost:3000/empresa";

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  //Método que llama al back-end para obtener las empresas
  getEmpresas(): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(this.url, httpOptions);
  }
  //Método que llama al back-end para obtener las empresas relacionadas con un centro
  getEmpresasByCentro(codigoCentro): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/${codigoCentro}`, httpOptions);
  }
  //Método que llama al back-end para obtener un el FP y el centro relacionados con la empresa
  getFPandCentroByEmpresa(idEmpresa): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/empresa/${idEmpresa}`, httpOptions);
  }
  //Método que llama al back-end para obtener las empresas asociadas a un FP
  getEmpresasByFp(fpDual): Observable<JSON[]> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.get<JSON[]>(`${this.url}/fp/${fpDual}`, httpOptions);
  }
  formarEmpresa(empresa, dineroBeca) {
    var res = {
      dineroBeca: empresa.becas == 1 || empresa.becas == "si" ? dineroBeca : 0,
      becas: empresa.becas == 1 || empresa.becas == "si" ? 1 : 0,
      cifEmpresa: empresa.cifEmpresa, empresa,
      direccion: empresa.direccion,
      nombre: empresa.nombre,
      telefono: empresa.telefono,
      correo: empresa.correo,
      url: empresa.url,
      plazas: empresa.plazas,
      fpDual: empresa.fpDual,
      codigoCentro: empresa.codigoCentro,
      id: empresa.id != null ? empresa.id : 0,
    }
    return res;
  }
  //Método que llama al back-end para crear una empresa
  addEmpresa(empresa,  dineroBeca): Observable<JSON> {
    var res = this.formarEmpresa(empresa, dineroBeca);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.post<JSON>(`${this.url}/create`, res, httpOptions);
  }
  //Método que llama al back-end para eliminar una empresa
  deleteEmpresa(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/${id}`, httpOptions);
  }
  //Método que llama al back-end para actualizar una empresa
  updateEmpresa(empresa, dineroBeca): Observable<JSON> {
    var res = this.formarEmpresa(empresa, dineroBeca);
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.put<JSON>(`${this.url}/update`, res, httpOptions);
  }
  //Método que llama al back-end para eliminar todo lo asociado a la empresa
  deleteTutorEmpresaByEmpresa(id): Observable<JSON> {
    var httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ "Authorization": this.cookieService.get('token'), "Content-Type": "application/json", "X-Frame-Options": "deny" }), }
    return this.http.delete<JSON>(`${this.url}/delete/${id}`, httpOptions);
  }

}
