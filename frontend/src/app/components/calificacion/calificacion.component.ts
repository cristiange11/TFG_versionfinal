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
import { Calificacion } from 'src/app/models/Calificacion';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  calificacionList = [];
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['nombreUsuario', 'apellidoUsuario', 'nota', 'descripcion'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Calificacion>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private calificacionService: CalificacionService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Calificacion>();
    document.body.style.background = "linear-gradient(to right,#c8aeee, #94e9ad)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      console.log(this.user.rol)
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2 && Number(this.user.rol ) != 4) {
        this.router.navigate(['home']);
      }

    }
    this.getAll();
  }
  getAll() {
    if(Number(this.user.rol != 5)){
      console.log("Modulo => " + Number(sessionStorage.getItem('codigoModulo')))
      this.serviceSubscribe = this.calificacionService.getCalificaciones(Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
        .subscribe(
          data => {
            console.log(data)
            let calificaciones = data["calificaciones"];

            calificaciones.forEach(calificacionesInfo => {
              console.log("Calificaciones => " + calificacionesInfo.nombreUsuario);
              this.calificacionList.push(calificacionesInfo);

            });
            this.dataSource.data = this.calificacionList
          },
          error => {
            console.log(error)
            if (error.status == 401 && error.error.errors == "Sesión expirada") {
              AppComponent.myapp.openDialogSesion();

            }
            else if (error.status == 406) {
              const res = new Array();
              res.push("Petición incorrecta.");
              AppComponent.myapp.openDialog(res);
            }
          });
        }
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Calificacion, filter: string) => {
      let find = true;

      for (var columnName in this.columnsFilters) {

        let currentData = "" + data[columnName];

        //if there is no filter, jump to next loop, otherwise do the filter.
        if (!this.columnsFilters[columnName]) {
          return find;
        }


        let searchValue = this.columnsFilters[columnName]["contains"];

        if (!!searchValue && currentData.indexOf("" + searchValue) < 0) {
          find = false;
          //exit loop
          return find;
        }

        searchValue = this.columnsFilters[columnName]["equals"];
        if (!!searchValue && currentData != searchValue) {
          find = false;
          //exit loop
          return find;
        }

        searchValue = this.columnsFilters[columnName]["greaterThan"];
        if (!!searchValue && currentData <= searchValue) {
          find = false;
          //exit loop
          return find;
        }

        searchValue = this.columnsFilters[columnName]["lessThan"];
        if (!!searchValue && currentData >= searchValue) {
          find = false;
          //exit loop
          return find;
        }

        searchValue = this.columnsFilters[columnName]["startWith"];

        if (!!searchValue && !currentData.startsWith("" + searchValue)) {
          find = false;
          //exit loop
          return find;
        }

        searchValue = this.columnsFilters[columnName]["endWith"];
        if (!!searchValue && !currentData.endsWith("" + searchValue)) {
          find = false;
          //exit loop
          return find;
        }

      }

      return find;
    };

    this.dataSource.filter = null;
    this.dataSource.filter = 'activate';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Create a filter for the column name and operate the filter action.
   */
  applyFilter(columnName: string, operationType: string, searchValue: string) {
    this.columnsFilters[columnName] = {};
    this.columnsFilters[columnName][operationType] = searchValue;
    this.filter();
  }

  /**
   * clear all associated filters for column name.
   */
  clearFilter(columnName: string) {
    if (this.columnsFilters[columnName]) {
      delete this.columnsFilters[columnName];
      this.filter();
    }
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }
  add() {
    /*
    this.dialog.open(EmpresaCreateComponent, {
      width: '400px'
    });
    */
  }
  edit(data) {
    /*
    this.dialog.open(EmpresaUpdateComponent, {
      width: '400px',
      data: data
    });*/

  }

  delete(CIF: string) {
    /*
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empresaService.deleteEmpresa(CIF).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {
              if (error.status == 401 && error.error.errors == "Sesión expirada") {
                AppComponent.myapp.openDialogSesion();

              }
              else if (error.status == 406) {
                const res = new Array();
                res.push("Petición incorrecta.");
                AppComponent.myapp.openDialog(res);
              }
              else if (error.status == 409) {
                const dialogRef2 = this.dialog.open(EmpresaDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.empresaService.deleteTutorEmpresaByEmpresa(CIF).pipe(first())
                      .subscribe(
                        data => {
                          window.location.reload();
                        },
                        error => {
                          if (error.status == 401 && error.error.errors == "Sesión expirada") {
                            AppComponent.myapp.openDialogSesion();
                          } else {
                            const res = new Array();
                            res.push("No se ha podido borrar.");
                            AppComponent.myapp.openDialog(res);
                          }
                        }
                      )
                  }
                });
              }
            });
      }
    });
    */
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
