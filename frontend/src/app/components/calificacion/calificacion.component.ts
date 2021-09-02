import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import 'jspdf-autotable';
@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  calificacionList = [];
  //Atributo que hace referencia al usuario que ha iniciado sesión
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['nombreUsuario', 'apellidoUsuario', 'nota', 'descripcion'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Calificacion>;
  private serviceSubscribe: Subscription;
  constructor( private nagivationComponent: NavigationComponent, private cookieService: CookieService, private calificacionService: CalificacionService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Calificacion>();
    document.body.style.background = "linear-gradient(to right,#c8aeee, #94e9ad)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  //Método utilizado para cargar los elementos de la barra de navegación, el usuario que ha iniciado sesión, las calificaciones y los filtros de las calificaciones
  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.user = (JSON.parse(this.cookieService.get('user')));
    this.getAll();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombreUsuario.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.apellidoUsuario.toLowerCase().includes(filter) || data.nota.toString().includes(filter);
    };
  }
  //Método utilizado para cargar todas las calificaciones a través de la subscripción
  getAll() {
    if (Number(this.user.rol != 5)) {
      this.serviceSubscribe = this.calificacionService.getCalificaciones(Number(sessionStorage.getItem('codigoModulo'))).pipe(first())
        .subscribe(
          data => {
            let calificaciones = data["calificaciones"];
            calificaciones.forEach(calificacionesInfo => {
              this.calificacionList.push(calificacionesInfo);
            });
            this.dataSource.data = this.calificacionList
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

  }
  //Método utilizado para realizar el filtro
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  //Método utilizado para añadir una calificación
  add() {
    this.dialog.open(CalificacionCreateComponent, {
      width: '400px'
    });
  }
  //Método utilizado para editar una calificación
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
              } else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo más tarde.");
                AppComponent.myapp.openDialog(res);
              } else {
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
