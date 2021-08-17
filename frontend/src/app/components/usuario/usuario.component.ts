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
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { DatePipe } from '@angular/common';
import { UsuarioUpdateComponent } from '../modals/usuario/usuario-update/usuario-update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { UsuarioDeleteConfirmationComponent } from '../modals/usuario/usuario-delete-confirmation/usuario-delete-confirmation.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy, AfterViewInit {

  myApp = AppComponent.myapp;
  userList: Array<User> = [];
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['nombre', 'apellidos', 'correo', 'movil', 'direccion', 'genero', 'fechaNacimiento', 'rol', 'codigoCentro', 'fpDual'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<User>;
  private serviceSubscribe: Subscription;

  constructor(public datepipe: DatePipe, private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private userService: AuthService, public dialog: MatDialog) {
    document.body.style.background = "linear-gradient(to right, #eeaeca, #94bbe9)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data.codigoCentro == null && data.fpDual == null) {
        return data.nombre.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter) || data.correo.toLowerCase() === filter || data.movil.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.genero.toLowerCase().includes(filter) || data.fechaNacimiento.toLowerCase().includes(filter) || data.rol.toLowerCase().includes(filter);
      }
      else if (data.codigoCentro != null && data.fpDual == null) {
        return data.nombre.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter) || data.correo.toLowerCase() === filter || data.movil.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.genero.toLowerCase().includes(filter) || data.fechaNacimiento.toLowerCase().includes(filter) || data.rol.toLowerCase().includes(filter) || data.codigoCentro.toLowerCase().includes(filter);
      }
      else if (data.codigoCentro == null && data.fpDual != null) {
        return data.nombre.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter) || data.correo.toLowerCase() === filter || data.movil.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.genero.toLowerCase().includes(filter) || data.fechaNacimiento.toLowerCase().includes(filter) || data.rol.toLowerCase().includes(filter) || data.fpDual.toLowerCase().includes(filter);
      }
      else {
        return data.nombre.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter) || data.correo.toLowerCase() === filter || data.movil.toLowerCase().includes(filter) || data.direccion.toLowerCase().includes(filter) || data.genero.toLowerCase().includes(filter) || data.fechaNacimiento.toLowerCase().includes(filter) || data.rol.toLowerCase().includes(filter) || data.fpDual.toLowerCase().includes(filter) || data.codigoCentro.toLowerCase().includes(filter);

      }
    };
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
      this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol) != 2) {
        this.router.navigate(['home']);
      }

    
    this.getAll();
    }
  }
  getAll() {
    if (Number(this.user.rol) == 1) {
      this.serviceSubscribe = this.userService.getUsers().pipe(first())
        .subscribe(
          data => {
            let usuarios = data["usuarios"];

            usuarios.forEach(usuarioInfo => {
              var user = this.getUserFila(usuarioInfo);
              this.userList.push(user);

            });
            this.dataSource.data = this.userList;
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
    } else {
      this.serviceSubscribe = this.userService.getUsersByCentro(this.user.codigoCentro).pipe(first())
        .subscribe(
          data => {
            let usuarios = data["usuarios"];

            usuarios.forEach(usuarioInfo => {
              
              var user = this.getUserFila(usuarioInfo);

              this.userList.push(user);

            });
            this.dataSource.data = this.userList;
           
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
  }
  getUserFila(usuarioInfo) {
    var user = {
      dni: usuarioInfo.dni,
      nombre: usuarioInfo.nombre,
      apellidos: usuarioInfo.apellidos,
      correo: usuarioInfo.correo,
      movil: usuarioInfo.movil,
      direccion: usuarioInfo.direccion,
      password: usuarioInfo.password,
      genero: usuarioInfo.genero,
      cp: usuarioInfo.cp,
      rol: usuarioInfo.nombreRol,
      fechaNacimiento: this.datepipe.transform(usuarioInfo.fechaNacimiento, "dd/MM/YYYY"),
      fpDual: usuarioInfo.nombreFP,
      codigoCentro: usuarioInfo.nombreCentro,
      fpId: usuarioInfo.fpDual,
      codigoCent: usuarioInfo.codigoCentro,
      rolId: usuarioInfo.rol
    }
    return user;
  }
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue = value.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(data: User) {
    this.dialog.open(UsuarioUpdateComponent, {
      width: '400px',
      data: data
    });

  }

  delete(dni: string) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(dni).pipe(first())
          .subscribe(
            data => {
              window.location.reload();
            },
            error => {
              if (error.status == 401 && error.error.errors == "Sesión expirada") {
                AppComponent.myapp.openDialogSesion();
              }else if (error.status == 500) {
                const res = new Array();
                res.push("Error del servidor, vuelva a intentarlo más tarde.");
                AppComponent.myapp.openDialog(res);
              }
              else if (error.status == 406) {
                const res = new Array();
                res.push("Petición incorrecta.");
                AppComponent.myapp.openDialog(res);
              }
              else if (error.status == 409) {
                const dialogRef2 = this.dialog.open(UsuarioDeleteConfirmationComponent);
                dialogRef2.afterClosed().subscribe(result => {
                  if (result) {
                    this.userService.deleteLogByUser(dni).pipe(first())
                      .subscribe(
                        data => {
                          window.location.reload();
                        },
                        error => {
                          if (error.status == 401 && error.error.errors == "Sesión expirada") {
                            AppComponent.myapp.openDialogSesion();
                          }else if (error.status == 406) {
                            const res = new Array();
                            res.push("Petición incorrecta.");
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
