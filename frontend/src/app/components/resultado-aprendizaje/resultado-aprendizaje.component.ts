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
  resultadoAprendizajeList: Array<ResultadoAprendizaje> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['titulo', 'descripcion'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<ResultadoAprendizaje>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private resultadoAprendizajeService: ResultadoAprendizajeService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ResultadoAprendizaje>();
    document.body.style.background = "linear-gradient(to right, #3ab4a2, #1d69fd)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      var user = (JSON.parse(this.cookieService.get('user')));
      if (Number(user.rol) != 1 && Number(user.rol) != 2) {
        this.router.navigate(['home']);
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
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          } else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: ResultadoAprendizaje, filter: string) => {
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
    const dialogRef = this.dialog.open(ResultadoAprendizajeCreateComponent, {
      width: '400px'
    });
  }
  edit(data: ResultadoAprendizaje) {
    console.log(data)
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
              if(error.status == 401 && error.error.errors == "Sesión expirada"){
                AppComponent.myapp.openDialogSesion();                             
              } else if (error.status == 406) {
                const res = new Array();
                res.push("Petición incorrecta.");
                AppComponent.myapp.openDialog(res);
              }
              else{
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


