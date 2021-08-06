import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Encuesta } from 'src/app/models/Encuesta';
import { Fpduales } from 'src/app/models/Fpduales';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { DeleteComponent } from '../modals/delete/delete.component';
import { EncuestaCreateComponent } from '../modals/encuesta/encuesta-create/encuesta-create.component';
import { EncuestaUpdateComponent } from '../modals/encuesta/encuesta-update/encuesta-update.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  encuestaList = [];
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['titulo', 'descripcion', 'nombreApellidoTutor', 'nombreApellidoAlumno', 'resultado'];
  public columnsToDisplay: string[];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Encuesta>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private encuestaService: EncuestaService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Encuesta>();
    document.body.style.background = "linear-gradient(to right, #3ab4a2, #1d69fd)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();

    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2 && Number(this.user.rol) != 4 && Number(this.user.rol) != 3 && Number(this.user.rol) != 5) {
        this.router.navigate(['home']);
      }

    }
    if (Number(this.user.rol) == 3) {
      this.columnsToDisplay = [...this.displayedColumns, 'actions'];
    }

    else {
      if (Number(this.user.rol) == 4) {
        this.columnsToDisplay = [...this.displayedColumns, 'observaciones'];
      } else if (Number(this.user.rol) == 1 || Number(this.user.rol) == 2) {
        this.columnsToDisplay = [...this.displayedColumns, 'actions', 'observaciones'];
      }
    }
    this.dataSource.filterPredicate = function (data, filter: string): boolean {

      return data.titulo.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.resultado.toString().includes(filter) || data.nombreApellidoAlumno.toLowerCase().includes(filter) || data.nombreApellidoTutor.toLowerCase().includes(filter);
    };
    this.getAll();
  }
  getAll() {
    if (Number(this.user.rol) != 3) {
      this.serviceSubscribe = this.encuestaService.getEncuestas(Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
        .subscribe(
          data => {
            let encuestas = data["encuestas"];

            encuestas.forEach(encuestaInfo => {
              var encuesta = this.transformJSON(encuestaInfo);
              this.encuestaList.push(encuesta);
            });

            this.dataSource.data = this.encuestaList;
          },
          error => {
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }

          });
    } else {
      this.serviceSubscribe = this.encuestaService.getEncuestasByTutor(this.user.dni, Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
        .subscribe(
          data => {
            let encuestas = data["encuestas"];
            

            encuestas.forEach(encuestaInfo => {
              var encuesta = this.transformJSON(encuestaInfo);
              this.encuestaList.push(encuesta);
            });

            this.dataSource.data = this.encuestaList;
          },
          error => {
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();
            } else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }

          });
    }
  }
  transformJSON(encuestaInfo) {
    var encuesta = {
      titulo: encuestaInfo.titulo,
      descripcion: encuestaInfo.descripcion,
      nombreApellidoTutor: encuestaInfo.nombreTutor + " " + encuestaInfo.apellidoTutor,
      nombreApellidoAlumno: encuestaInfo.nombreAlumno + " " + encuestaInfo.apellidoAlumno,
      resultado: encuestaInfo.resultado,
      observaciones: encuestaInfo.observaciones,
      id: encuestaInfo.id
    }
    return encuesta;
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  add() {
    this.dialog.open(EncuestaCreateComponent, {
      width: '400px'
    });
  }
  edit(data: Fpduales) {

    this.dialog.open(EncuestaUpdateComponent, {
      width: '400px',
      data: data
    });

  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.encuestaService.deleteEncuesta(id).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {
              if (error.status == 401 && error.error.errors == "Sesión expirada") {
                AppComponent.myapp.openDialogSesion();
              }
              else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo más tarde.");
                AppComponent.myapp.openDialog(res);
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
    });

  }

  getObservaciones(id) {
    AppComponent.myapp.openDialogEncuesta(id);

  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
