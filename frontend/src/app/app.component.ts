import { EncuestaService } from 'src/app/services/encuesta.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './components/modals/modal/modal.component';
import { SesionComponent } from './components/modals/sesion/sesion.component';
import titles from './files/titles.json';
import { first } from 'rxjs/operators';
import { PasswordComponent } from './components/modals/password/password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  static myapp;
  constructor(public dialog: MatDialog, public encuestaService: EncuestaService) {
    AppComponent.myapp = this;
  }
  //Fichero JSON para cambiar palabras de la vista
  getTitle(param: string) {
    return titles[param] != undefined ? titles[param] : param;
  }
  //Método para abrir un modal
  openDialog(texto: string): void {
    this.dialog.open(ModalComponent, {
      width: '300px',
      data: { texto: texto }
    });
  }
  //Método que abre un modal mostrando que la sesión ha finalizado
  openDialogSesion(): void {
    this.dialog.open(SesionComponent, {
      width: '300px',
      disableClose: true

    });
  }
  //Método utilizado para informar del cambio de contraseña
  openDialogUpdatePassword(): void {
    this.dialog.open(PasswordComponent, {
      width: '300px',
      disableClose: true

    });
  }
  opencorreoDialogSesion(texto: string): void {
    this.dialog.open(ModalComponent, {
      width: '500px',
      data: { texto: texto }
    });
  }
  //Método que sirve para mostrar las observaciones de la encuesta
  openDialogEncuesta(id): void {
    this.encuestaService.getEncuesta(id).pipe(first())
      .subscribe(
        data => {
          let encuesta = data['encuestas'];
          let resultado = [];
          encuesta.forEach(encuestaInfo => {
            var enc = encuestaInfo.observaciones;
            if (enc == null) {
              resultado.push("No tiene observaciones del tutor");
            } else {
              var observaciones = enc;

              resultado.push(observaciones);
            }
          })



          this.dialog.open(ModalComponent, {
            width: '500px',
            data: { texto: resultado }
          });
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else {
            const res = new Array();
            res.push("No se ha podido borrar.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
}
