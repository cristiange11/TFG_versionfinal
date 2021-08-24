import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from '../../models/Centro';
import { CentroService } from '../../services/centro.service';
import { FpdualesService } from '../../services/fpduales.service';
import { AppComponent } from '../../app.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { CentroUpdateComponent } from '../modals/centro/centro-update/centro-update.component';
import { CentroDeleteConfirmationComponent } from '../modals/centro/centro-delete-confirmation/centro-delete-confirmation.component';
import { CentroCreateComponent } from '../modals/centro/centro-create/centro-create.component';
import { CookieService } from 'ngx-cookie-service';
import { NavigationComponent } from '../navigation/navigation.component';

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

  public displayedColumns: string[] = ['nombre', 'provincia', 'direccion', 'CP', 'telefono', 'correo'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions', 'fps'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Centro>;
  private serviceSubscribe: Subscription;
  constructor(private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private fpService: FpdualesService, private centroService: CentroService, public dialog: MatDialog) {
    document.body.style.background = "linear-gradient(to right, #2d66c9, #1dcd65)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    this.dataSource = new MatTableDataSource<Centro>();
    this.getAll();

  }

  ngOnInit(): void {
    var userCookie = (JSON.parse(this.cookieService.get('user')));
    this.nagivationComponent.obtenerItems();
    
    this.dataSource.filterPredicate = function (data, filter: string): boolean {

      return data.nombre.toLowerCase().includes(filter) || data.provincia.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.telefono.toLowerCase().includes(filter) || data.correo.toLowerCase().includes(filter) || data.CP.toLowerCase().includes(filter);
    };

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
          }


        });
  }
  getFps(codigoCentro) {
    sessionStorage.setItem('codigoCentro', codigoCentro);
    this.router.navigate(['fpdual']);
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;

  }

  add() {
    this.dialog.open(CentroCreateComponent, {
      width: '400px'
    });
  }
  edit(data: Centro) {

    this.dialog.open(CentroUpdateComponent, {
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

              else if (error.status == 409) {
                const dialogRef2 = this.dialog.open(CentroDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.centroService.deleteUserAndFPByCentro(codigoCentro).pipe(first())
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
                          else if (error.status == 500) {
                            const res = new Array();
                            res.push("Error del servidor, vuelva a intentarlo más tarde.");
                            AppComponent.myapp.openDialog(res);
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
    if (this.cookieService.get('user')) {
      this.serviceSubscribe.unsubscribe();
    }
  }

}
