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
import { ResultadoAprendizaje } from 'src/app/models/ResultadoAprendizaje';
import { ResultadoAprendizajeService } from 'src/app/services/resultado-aprendizaje.service';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ResultadoAprendizajeCreateComponent } from '../modals/resultado-aprendizaje/resultado-aprendizaje-create/resultado-aprendizaje-create.component';
import { ResultadoAprendizajeUpdateComponent } from '../modals/resultado-aprendizaje/resultado-aprendizaje-update/resultado-aprendizaje-update.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-resultado-aprendizaje',
  templateUrl: './resultado-aprendizaje.component.html',
  styleUrls: ['./resultado-aprendizaje.component.css']
})
export class ResultadoAprendizajeComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  user;
  resultadoAprendizajeList: Array<ResultadoAprendizaje> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['titulo', 'descripcion'];
  public columnsToDisplay: string[];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<ResultadoAprendizaje>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private resultadoAprendizajeService: ResultadoAprendizajeService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ResultadoAprendizaje>();
    document.body.style.background = "linear-gradient(to right,#d2eeae, #73cbc2, #6e68a0,#7a70b1)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.titulo.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter);
    };
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2 && Number(this.user.rol) != 4 && Number(this.user.rol != 3) && Number(this.user.rol != 5)) {
        this.router.navigate(['home']);
      }
      else if (Number(this.user.rol) == 1 || Number(this.user.rol) == 2 || Number(this.user.rol) == 4) {
        this.columnsToDisplay = [...this.displayedColumns, 'actions'];
      }
      else {
        this.columnsToDisplay = [...this.displayedColumns];
      }
    }
  }
  getAll() {

    this.serviceSubscribe = this.resultadoAprendizajeService.getResultadoAprendizaje(Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
      .subscribe(
        data => {
          let resultadoAprendizaje = data["resultadoAprendizaje"];
          resultadoAprendizaje.forEach(resultadoAprendizajeInfo => {
            this.resultadoAprendizajeList.push(resultadoAprendizajeInfo);

          });

          this.dataSource.data = this.resultadoAprendizajeList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  add() {
    const dialogRef = this.dialog.open(ResultadoAprendizajeCreateComponent, {
      width: '400px'
    });
  }
  edit(data: ResultadoAprendizaje) {
   
    const dialogRef = this.dialog.open(ResultadoAprendizajeUpdateComponent, {
      width: '400px',
      data: data
    });

  }
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resultadoAprendizajeService.deleteResultadoAprendizaje(id).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {
              if (error.status == 401 && error.error.errors == "Sesión expirada") {
                AppComponent.myapp.openDialogSesion();
              } else if (error.status == 406) {
                const res = new Array();
                res.push("Petición incorrecta.");
                AppComponent.myapp.openDialog(res);
              }else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo más tarde.");
                AppComponent.myapp.openDialog(res);
              }
              else {
                const res = new Array();
                res.push("No se ha podido borrar.");
                AppComponent.myapp.openDialog(res);
              }
            });
      }
    });

  }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}


