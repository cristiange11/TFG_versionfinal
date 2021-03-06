import { AlumnoService } from 'src/app/services/alumno.service';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Modulo } from 'src/app/models/Modulo';
import { ModuloService } from 'src/app/services/modulo.service';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ModuloCreateComponent } from '../modals/modulo/modulo-create/modulo-create.component';
import { ModuloUpdateComponent } from '../modals/modulo/modulo-update/modulo-update.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'
import { ModuloDeleteConfirmationComponent } from '../modals/modulo/modulo-delete-confirmation/modulo-delete-confirmation.component';
@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  user;
  userLogged = false;
  moduloList: Array<Modulo> = [];
  private selectedFile: File;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['nombre', 'descripcion', 'curso'];

  public columnsToDisplay: string[];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Modulo>;
  private serviceSubscribe: Subscription;
  constructor(private alumnoService: AlumnoService, private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private moduloService: ModuloService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Modulo>();
    document.body.style.background = "linear-gradient(to right, #aeeecd, #8433cf)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  //M??todo utilizado para cargar los filtros, obtener los elementos de la barra de navegaci??n y obtener los m??dulos
  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.curso.toString() === filter;
    };
    this.nagivationComponent.obtenerItems();
    this.user = (JSON.parse(this.cookieService.get('user')));
    this.getAll();
  }
  //M??todo para descargar el PDF ocn las notas asociadas al alumno
  descargarPDF() {
    this.alumnoService.getCalificacionAlumno(this.user.dni).pipe(first())
      .subscribe(
        data => {
          let calificaciones = data["alumnos"];
          var header = [];
          header.push('M??dulo', 'Calificaci??n');
          var rowTable = [];
          calificaciones.forEach(moduloInfo => {
            var nota;
            if (moduloInfo.nota == null) {
              nota = "No calificado";
            }
            else { nota = moduloInfo.nota; }
            const row = [moduloInfo.nombreModulo, nota];
            rowTable.push(row);
          });
          var doc = new jsPDF('p', 'pt');

          doc.setFontSize(18);
          doc.setFontSize(11);
          doc.setTextColor(100);

          autoTable(doc, {
            head: [header],
            body: rowTable
          })
          // below line for Download PDF document  
          doc.save('calificaciones.pdf');

        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          }
          else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }
        });
  }
  //M??todo para obtener todos los m??dulos del FP dual
  obtenerModulosAdmin(fpDual) {
    this.serviceSubscribe = this.moduloService.getModulos(fpDual).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {
            this.moduloList.push(moduloInfo);
          });
          this.dataSource.data = this.moduloList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  //M??todo utilizaod para navegar a la p??gina de calificaci??n y observar las calificaciones que hay en el m??dulo
  getCalificacion(codigoModulo) {
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    this.router.navigate(['calificacion']);
  }
  //M??todo utilizado para obtener los m??dulos del profesor
  obtenerModulosProf(dni) {
    this.serviceSubscribe = this.moduloService.getModulosProf(dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {
            this.moduloList.push(moduloInfo);
          });
          this.dataSource.data = this.moduloList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  //m??todo utilziaod para obtener los m??dulos del tutor
  obtenerModulosTut(dni) {
    this.serviceSubscribe = this.moduloService.getModulosTut(dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {
            this.moduloList.push(moduloInfo);
          });
          this.dataSource.data = this.moduloList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  //M??todo utilziado para obtener los m??dulos del alumno
  obtenerModulosAlum(dni) {
    this.serviceSubscribe = this.moduloService.getModulosAlum(dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {
            this.moduloList.push(moduloInfo);
          });
          this.dataSource.data = this.moduloList;
        },
        error => {
          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
            AppComponent.myapp.openDialogSesion();
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petici??n incorrecta.");
            AppComponent.myapp.openDialog(res);
          } else if (error.status == 500) {
            const res = new Array();
            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
            AppComponent.myapp.openDialog(res);
          }

        });
  }
  //M??todo utilziado para realizar los filtros
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
  //M??todo que se utiliza para cargar las columnas de la tabla dependiendo del usuario que haya iniciado sesi??n
  getAll() {
    if (Number(this.user.rol) == 1 || Number(this.user.rol) == 2) {
      this.columnsToDisplay = [...this.displayedColumns, 'actions', 'resultadoAprendizaje', 'encuesta', 'calificacion'];
      this.obtenerModulosAdmin(Number(sessionStorage.getItem('fpDual')));

    } else if (Number(this.user.rol) == 4) {
      this.columnsToDisplay = [...this.displayedColumns, 'resultadoAprendizaje', 'encuesta', 'calificacion'];
      this.obtenerModulosProf(this.user.dni);
    } else if (Number(this.user.rol) == 3) {
      this.columnsToDisplay = [...this.displayedColumns, 'resultadoAprendizaje', 'encuesta'];
      this.obtenerModulosTut(this.user.dni);
    } else if (Number(this.user.rol) == 5) {
      this.columnsToDisplay = [...this.displayedColumns, 'resultadoAprendizaje'];
      this.obtenerModulosAlum(this.user.dni);
    }

  }
  //M??todo utilizado para a??adir un m??dulo
  add() {
    const dialogRef = this.dialog.open(ModuloCreateComponent, {
      width: '400px'
    });
  }
  //M??todo utilizado para editar un m??dulo
  edit(data: Modulo) {
    const dialogRef = this.dialog.open(ModuloUpdateComponent, {
      width: '400px',
      data: data
    });
  }
  //M??todo utilizado para navegar a la p??gina de resultados de aprendizaje y obtener los resultados de aprnedizaje asociados al m??dulo
  getResultadosAprendizaje(codigoModulo) {
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    this.router.navigate(['resultadoaprendizaje']);
  }
  //M??todo utilizado para navegar a la p??gina de encuestas y obtener las encuestas asociadas al m??dulo
  getEncuesta(codigoModulo) {
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    this.router.navigate(['encuesta']);
  }
  //M??todo utilizado para eliminar el m??dulo
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moduloService.deleteModulo(id).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {
              if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
                AppComponent.myapp.openDialogSesion();
              }
              else if (error.status == 406) {
                const res = new Array();
                res.push("Petici??n incorrecta.");
                AppComponent.myapp.openDialog(res);
              } else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
                AppComponent.myapp.openDialog(res);
              } else if (error.status == 409) {
                const dialogRef2 = this.dialog.open(ModuloDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.moduloService.deleteAllByModulo(id).pipe(first())
                      .subscribe(
                        data => {
                          window.location.reload();
                        },
                        error => {
                          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
                            AppComponent.myapp.openDialogSesion();
                          } else if (error.status == 406) {
                            const res = new Array();
                            res.push("Petici??n incorrecta.");
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
    };
  }

}
