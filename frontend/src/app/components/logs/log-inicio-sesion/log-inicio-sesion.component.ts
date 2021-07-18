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
import { LogInicioSesion } from 'src/app/models/Log/LogInicioSesion';
import { LogInicioSesionService } from 'src/app/services/logs/log-inicio-sesion.service';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-log-inicio-sesion',
  templateUrl: './log-inicio-sesion.component.html',
  styleUrls: ['./log-inicio-sesion.component.css']
})
export class LogInicioSesionComponent implements OnInit , OnDestroy, AfterViewInit{
  myApp = AppComponent.myapp;
  logSesionList : Array<LogInicioSesion> = [];;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['usuario', 'fechaHoraLog', 'error'];
  public columnsToDisplay: string[] = [...this.displayedColumns];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<LogInicioSesion>;
  private serviceSubscribe: Subscription;
  constructor( private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private logInicioSesionService: LogInicioSesionService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<LogInicioSesion>();
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
    this.serviceSubscribe = this.logInicioSesionService.getSesiones().pipe(first())
      .subscribe(
        data => {
          
          let logSesion = data["logSesion"];
         
          logSesion.forEach(logSesionInfo => {          
            this.logSesionList.push(logSesionInfo);
            
          });
        
            this.dataSource.data = this.logSesionList
        },
        error => {
          console.log(error.error.message);
        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: LogInicioSesion, filter: string) => {
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
  

 
  
  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}

