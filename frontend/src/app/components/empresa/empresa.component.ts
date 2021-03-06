import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { EmpresaCreateComponent } from 'src/app/components/modals/empresa/empresa-create/empresa-create.component';
import { EmpresaUpdateComponent } from '../modals/empresa/empresa-update/empresa-update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { EmpresaDeleteConfirmationComponent } from '../modals/empresa/empresa-delete-confirmation/empresa-delete-confirmation.component';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  empresaList = [];
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['cifEmpresa', 'nombre', 'direccion', 'telefono', 'correo', 'url', 'dineroBeca', 'plazas'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions', 'FP'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<Empresa>;
  private serviceSubscribe: Subscription;
  constructor( private nagivationComponent: NavigationComponent, private cookieService: CookieService, private empresaService: EmpresaService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Empresa>();
    document.body.style.background = "linear-gradient(to right,#c8aeee, #94e9ad)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  //M??todo utilizado para cargar los elementos de la barra de navegaci??n, el usuario que ha iniciaod sesi??n, las empresas asociadas al usuario y los filtros
  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.user = (JSON.parse(this.cookieService.get('user')));
    this.getAll();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.cifEmpresa.toLowerCase().includes(filter) || data.nombre.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.telefono.toLowerCase().includes(filter) || data.correo.toLowerCase().includes(filter) || data.url.toLowerCase().includes(filter) || data.plazas.toString().includes(filter) || data.dineroBeca.toLowerCase().includes(filter);
    };
  }
  getFps(empresaInfo) {
    var empresa = {
      becas: empresaInfo.beca,
      cifEmpresa: empresaInfo.cifEmpresa,
      correo: empresaInfo.correo,
      dineroBeca: empresaInfo.dineroBeca,
      direccion: empresaInfo.direccion,
      //idFp: empresaInfo.idFp,
      nombre: empresaInfo.nombre,
      //nombreFP: empresaInfo.nombreFP,
      plazas: empresaInfo.plazas,
      telefono: empresaInfo.telefono,
      url: empresaInfo.url,
      id: empresaInfo.id
    }
    return empresa;
  }
  //M??todo para obtener todas las empresas, si el usuario es administrador de la aplicaci??n obtendr?? todas y si es administrador del centro obtendr?? solo las relacionadas con su centro
  getAll() {
    if (Number(this.user.rol) == 1) {
      this.serviceSubscribe = this.empresaService.getEmpresas().pipe(first())
        .subscribe(
          data => {

            let empresas = data["empresas"];

            empresas.forEach(empresaInfo => {
              this.empresaList.push(this.getFps(empresaInfo));

            });
            this.dataSource.data = this.empresaList
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
    } else {

      this.serviceSubscribe = this.empresaService.getEmpresasByCentro(this.user.codigoCentro).pipe(first())
        .subscribe(
          data => {

            let empresas = data["empresas"];

            empresas.forEach(empresaInfo => {
              this.empresaList.push(empresaInfo);

            });
            this.dataSource.data = this.empresaList
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
  }
  //M??todo para realizar los filtros
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();

    this.dataSource.filter = filterValue;
  }
  //M??todo para a??adir una nueva empresa
  add() {
    this.dialog.open(EmpresaCreateComponent, {
      width: '400px'
    });
  }
  //M??todo para conocer el FP y el centro asociados a la empresa
  getEmpresaAndCentro(idEmpresa) {
    this.serviceSubscribe = this.empresaService.getFPandCentroByEmpresa(idEmpresa).pipe(first())
      .subscribe(
        data => {
          let resultado = new Array();
          let empresas = data["empresas"];

          empresas.forEach(empresaInfo => {
            resultado.push(empresaInfo.nombreFP + ", " + empresaInfo.nombreCentro);
          });

          AppComponent.myapp.openDialog(resultado);
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

  //M??todo para editar las empresas
  edit(data) {
    sessionStorage.setItem("dineroBeca", data.dineroBeca);
    this.dialog.open(EmpresaUpdateComponent, {
      width: '400px',
      data: data
    });

  }
  //M??todo para eliminar la empresa
  delete(id) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empresaService.deleteEmpresa(id).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {

              if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
                AppComponent.myapp.openDialogSesion();

              }
              else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
                AppComponent.myapp.openDialog(res);
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
              else if (error.status == 409) {
                const dialogRef2 = this.dialog.open(EmpresaDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.empresaService.deleteTutorEmpresaByEmpresa(id).pipe(first())
                      .subscribe(
                        data => {
                          window.location.reload();
                        },

                        error => {
                          if (error.status == 401 && error.error.errors == "Sesi??n expirada") {
                            AppComponent.myapp.openDialogSesion();
                          } else if (error.status == 500) {
                            const res = new Array();
                            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
                            AppComponent.myapp.openDialog(res);
                          }
                          else if (error.status == 500) {
                            const res = new Array();
                            res.push("Error del servidor, vuelva a intentarlo m??s tarde.");
                            AppComponent.myapp.openDialog(res);
                          }
                          else if (error.status == 406) {
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
    }

  }

}
