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
import { LogService } from 'src/app/services/log.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  logList: Array<Log> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['usuario', 'fechaHoraLog', 'mensaje', 'codigoError', 'tipo'];
  public columnsToDisplay: string[] = [...this.displayedColumns];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<Log>;
  private serviceSubscribe: Subscription;
  constructor(private datepipe: DatePipe,  private nagivationComponent: NavigationComponent, private cookieService: CookieService, private logService: LogService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Log>();
    document.body.style.background = "linear-gradient(to right, #d2eeae, #b170ad)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  //Método utilizado para cargar los elementos de la barra de navegación, el usuario que ha iniciado sesión, los logs y los filtros
  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data.codigoError != null) {
        return data.usuario.toLowerCase().includes(filter) || data.fechaHoraLog.toLowerCase().includes(filter) || data.mensaje.toLowerCase().includes(filter) || data.codigoError.toLowerCase().includes(filter) || data.tipo.toLowerCase().includes(filter);
      }
      else {
        return data.usuario.toLowerCase().includes(filter) || data.fechaHoraLog.toLowerCase().includes(filter) || data.mensaje.toLowerCase().includes(filter) || data.tipo.toLowerCase().includes(filter);
      }
    };
  }
  //Método utilizado para cargar todos los logs
  getAll() {
    this.serviceSubscribe = this.logService.getLogs().pipe(first())
      .subscribe(
        data => {
          let logs = data["logs"];
          logs.forEach(logInfo => {
            var log = {
              id: logInfo.id,
              codigoError: logInfo.codigoError,
              mensaje: logInfo.mensaje,
              usuario: logInfo.usuario,
              fechaHoraLog: this.datepipe.transform(logInfo.fechaHoraLog, "dd/MM/YYYY hh:mm:ss"),
              tipo: logInfo.tipo,
            }
            this.logList.push(log);
          });
          this.dataSource.data = this.logList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesión expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo más tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  //Método utilizado para realizar los filtros
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  //Método utilizado para cargar la paginación y la ordenación de los logs tras cargar la página
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //Método utilizado para eliminar el ejecución
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
