import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from '../../models/Centro';
import {CentroService} from '../../services/centro.service';
import {FpdualesService} from '../../services/fpduales.service';
import { AppComponent } from '../../app.component';
import  {DeleteComponent } from '../modals/delete/delete.component';
import {CentroUpdateComponent} from '../modals/centro-update/centro-update.component';
import {CentroDeleteConfirmationComponent} from '../modals/centro-delete-confirmation/centro-delete-confirmation.component';
import { CentroCreateComponent } from '../modals/centro-create/centro-create.component';
import { CookieService } from 'ngx-cookie-service';
import {NavigationComponent} from '../navigation/navigation.component';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  centroList: Array<Centro> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['codigo_centro', 'nombre', 'provincia', 'direccion', 'CP', 'telefono', 'correo'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Centro>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private fpService: FpdualesService, private centroService: CentroService, public dialog: MatDialog) {
  document.body.style.background = "linear-gradient(to right, #2d66c9, #1dcd65)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

   this.dataSource = new MatTableDataSource<Centro>();
   }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    if(Number(this.cookieService.get('rol'))!= 1){
      this.router.navigate(['home']);
    }
   
    }
  getAll() {
    this.serviceSubscribe = this.centroService.getCentros().pipe(first())
      .subscribe(
        data => {
          let centros = data["centros"]
          centros.forEach(centroInfo => {          
            this.centroList.push(centroInfo)
            
          });
          
            this.dataSource.data = this.centroList
        },
        error => {
          console.log(error.error.message);
        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Centro, filter: string) => {
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

  add() {
    const dialogRef = this.dialog.open(CentroCreateComponent, {
      width: '400px',
      data: "aoal"
    });
  }
  buscar(){

  }
  edit(data: Centro) {
    
    const dialogRef = this.dialog.open(CentroUpdateComponent, {
      width: '400px',
      data: data
    });
    
  }

  delete(codigoCentro: any) {
    const dialogRef = this.dialog.open(DeleteComponent);

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
