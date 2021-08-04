import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
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
import { DeleteComponent } from '../modals/delete/delete.component';
import { FpdualCreateComponent } from '../modals/fpdual/fpdual-create/fpdual-create.component';
import { FpdualDeleteConfirmationComponent } from '../modals/fpdual/fpdual-delete-confirmation/fpdual-delete-confirmation.component';
import { FpdualUpdateComponent } from '../modals/fpdual/fpdual-update/fpdual-update.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-fpdual',
  templateUrl: './fpdual.component.html',
  styleUrls: ['./fpdual.component.css']
})
export class FpdualComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  fpList = [];
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['nombre', 'descripcion', 'totalPlazas', 'plazasDisponibles', 'nombreCentro', 'anio'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions', 'modulos'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Fpduales>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private fpService: FpdualesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Fpduales>();
    document.body.style.background = "linear-gradient(to right, #3ab4a2, #1d69fd)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();

    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.router.navigate(['home']);
      }

    }
    this.getAll();

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      console.log(data.anio)
      return data.nombre.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.plazasDisponibles.toString().includes(filter) || data.totalPlazas.toString().includes(filter) || data.nombreCentro.toLowerCase().includes(filter) || data.anio.toString().includes(filter);
    };
  }

  obtenerFps(codigoCentro) {
    this.serviceSubscribe = this.fpService.getFPsByCentro(codigoCentro).pipe(first())
      .subscribe(
        data => {
          let fps = data["fps"];
          fps.forEach(fpInfo => {
            var fp = this.getFpFila(fpInfo);
            console.log(fp.codigoCentro)
            this.fpList.push(fp);
          });

          this.dataSource.data = this.fpList;
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

        });
  }
  getAll() {
    if (sessionStorage.getItem('codigoCentro') == null) {
      if (Number(this.user.rol) == 1) {
        this.serviceSubscribe = this.fpService.getFps().pipe(first())
          .subscribe(
            data => {
              let fps = data["fps"];
              fps.forEach(fpInfo => {
                console.log(fpInfo)
                this.fpList.push(this.getFpFila(fpInfo));

              });

              this.dataSource.data = this.fpList;
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

            });
      }
      else {
        this.obtenerFps(this.user.codigoCentro);
      }
    }
    else {
      this.obtenerFps(sessionStorage.getItem('codigoCentro'));
    }
  }
  getFpFila(fpInfo) {
    console.log(fpInfo)
    var fp = {
      nombre: fpInfo.nombre,
      descripcion: fpInfo.descripcion,
      totalPlazas: fpInfo.totalPlazas,
      anio: fpInfo.anio,
      codigoCentro: fpInfo.codigoCentro,
      plazasDisponibles: fpInfo.plazasDisponibles,
      id: fpInfo.id,
      nombreCentro: fpInfo.nombreCentro,

    }

    return fp;
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  add() {
    this.dialog.open(FpdualCreateComponent, {
      width: '400px'
    });
  }
  edit(data: Fpduales) {
    console.log(data)
    this.dialog.open(FpdualUpdateComponent, {
      width: '400px',
      data: data
    });

  }
  getModulos(id: number) {
    sessionStorage.setItem('fpDual', id.toString());

    this.router.navigate(['modulo']);
  }
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fpService.deleteFp(id).pipe(first())
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
                const dialogRef2 = this.dialog.open(FpdualDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.fpService.deleteUsuariosByFP(id).pipe(first())
                      .subscribe(
                        data => {
                          window.location.reload();
                        },
                        error => {
                          if (error.status == 401 && error.error.errors == "Sesión expirada") {
                            AppComponent.myapp.openDialogSesion();
                          }
                          else {
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

  }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
