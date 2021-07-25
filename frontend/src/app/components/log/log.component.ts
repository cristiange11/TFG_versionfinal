import { DatePipe } from '@angular/common';
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
import { Log } from 'src/app/models/Log';
import { FpdualesService } from 'src/app/services/fpduales.service';
import { LogService } from 'src/app/services/log.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit , OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  logList: Array<Log> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public displayedColumns: string[] = ['usuario', 'fechaHoraLog', 'mensaje', 'codigoError', 'tipo'];
  public columnsToDisplay: string[] = [...this.displayedColumns];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Log>;
  private serviceSubscribe: Subscription;
  constructor( private datepipe : DatePipe, private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private logService: LogService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Log>();
    document.body.style.background = "linear-gradient(to right, #3ab4a2, #1d69fd)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
    this.serviceSubscribe = this.logService.getLogs().pipe(first())
      .subscribe(
        data => {
          let logs = data["logs"];
          logs.forEach(logInfo => {  
            var log = {
              id : logInfo.id,
              codigoError : logInfo.codigoError,
              mensaje : logInfo.mensaje,
              usuario : logInfo.usuario,
              fechaHoraLog : this.datepipe.transform(logInfo.fechaHoraLog,  "dd/MM/YYYY hh:mm:ss"),
              tipo : logInfo.tipo,
            }        
            
            this.logList.push(log);
            
          });
          
            this.dataSource.data = this.logList;
        },
        error => {
          console.log(error);
         
        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Log, filter: string) => {
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
