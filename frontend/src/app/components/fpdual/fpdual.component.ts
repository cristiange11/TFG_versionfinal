import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Fpduales } from 'src/app/models/Fpduales';
import { FpdualesService } from 'src/app/services/fpduales.service';
import { FpdualUpdateComponent } from '../modals/fpdual/fpdual-update/fpdual-update.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-fpdual',
  templateUrl: './fpdual.component.html',
  styleUrls: ['./fpdual.component.css']
})
export class FpdualComponent implements OnInit {
  myApp = AppComponent.myapp;
  fpList: Array<Fpduales> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public displayedColumns: string[] = ['nombre', 'descripcion', 'totalPlazas', 'plazasDisponibles', 'codigoCentro', 'anio'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Fpduales>;
  private serviceSubscribe: Subscription;
  constructor( private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private fpService: FpdualesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Fpduales>();
   }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      var user =(JSON.parse(this.cookieService.get('user')));
    if(Number(user.rol)!=1){
      this.router.navigate(['home']);
    }
    
    }
  }
  getAll() {
    this.serviceSubscribe = this.fpService.getFps().pipe(first())
      .subscribe(
        data => {
          let centros = data["fps"];
          centros.forEach(fpInfo => {          
            this.fpList.push(fpInfo);
            
          });
          
            this.dataSource.data = this.fpList;
        },
        error => {
          console.log(error);
         /* var arrayRes= new Array();
      arrayRes.push(error.error.errors);
      AppComponent.myapp.openDialog(arrayRes);*/
        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Fpduales, filter: string) => {
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
   /* const dialogRef = this.dialog.open(CentroCreateComponent, {
      width: '400px'
    });*/
  }
  edit(data: Fpduales) {
    
    const dialogRef = this.dialog.open(FpdualUpdateComponent, {
      width: '400px',
      data: data
    });
    
  }

  delete(codigoCentro: any) {
    /*const dialogRef = this.dialog.open(DeleteComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.centroService.deleteCentro(codigoCentro).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            if(error.status == 409){
              const dialogRef2 = this.dialog.open(CentroDeleteConfirmationComponent);
              dialogRef2.afterClosed().subscribe( result => {
                  if(result){
                    this.fpService.deleteFPByCentro(codigoCentro).pipe(first())
                    .subscribe(
                      data => {
                          window.location.reload();
                      },
                      error => {
                        const res = new Array();
                        res.push("No se ha podido borrar.");
                        AppComponent.myapp.openDialog(res);
                      }
                    )
                  }
              });
            }
          });
      }
    });*/

  }
  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
