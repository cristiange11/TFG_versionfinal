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
import { CalificacionCreateComponent } from '../modals/calificacion/calificacion-create/calificacion-create.component';
import { CalificacionUpdateComponent } from '../modals/calificacion/calificacion-update/calificacion-update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { NavigationComponent } from '../navigation/navigation.component';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
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
      
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2 && Number(this.user.rol) != 4) {
        this.router.navigate(['home']);
      }

    }
    var aux=this.getAll();
    
    this.dataSource.filterPredicate = function (data, filter: string): boolean {

      return data.nombreUsuario.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.apellidoUsuario.toLowerCase().includes(filter) || data.nota.toString().includes(filter);
    };
    
  }
  getAll() {
    var res = [];
    if (Number(this.user.rol != 5)) {
      this.serviceSubscribe = this.calificacionService.getCalificaciones(Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
        .subscribe(
          data => {
            let calificaciones = data["calificaciones"];

            calificaciones.forEach(calificacionesInfo => {
              this.calificacionList.push(calificacionesInfo);

            });
            this.dataSource.data = this.calificacionList
            this.calificacionList.forEach(calif =>{
              res.push(calif)
            })
            
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
            else if (error.status == 500) {
              const res = new Array();
              res.push("Error del servidor, vuelva a intentarlo más tarde.");
              AppComponent.myapp.openDialog(res);
            }
          });
    }
    return res;
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  add() {

    this.dialog.open(CalificacionCreateComponent, {
      width: '400px'
    });

  }
  edit(data) {

    this.dialog.open(CalificacionUpdateComponent, {
      width: '400px',
      data: {
        dni: data.dni,
        nombre: data.nombreUsuario,
        nota: data.nota,
        descripcion: data.descripcion,
        id: data.id,
        codigoModulo: sessionStorage.getItem('codigoModulo')
      }
    });

  }

  delete(id: number) {

    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calificacionService.deleteCalificacion(id).pipe(first())
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
              }else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo más tarde.");
                AppComponent.myapp.openDialog(res);
              }else{
                const res = new Array();
                res.push("No se ha podido eliminar.");
                AppComponent.myapp.openDialog(res);
              }

            }
          );
      }
    });

  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnDestroy(): void {
    if (this.cookieService.get('user')) {
      this.serviceSubscribe.unsubscribe();
    }
  }

}
