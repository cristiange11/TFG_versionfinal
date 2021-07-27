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
    
    if (!this.cookieService.get('user')) {
      this.router.navigate(['home']);
    }
    else {
       this.user = (JSON.parse(this.cookieService.get('user')));
      if (Number(this.user.rol) != 1 && Number(this.user.rol)!=2) {
        this.router.navigate(['home']);
      }

    }
    this.getAll();
  }
  getAll() {
    console.log(Number(this.user.rol) )
    if(Number(this.user.rol) == 1){
    this.serviceSubscribe = this.userService.getUsers().pipe(first())
      .subscribe(
        data => {
          let usuarios = data["usuarios"];

          usuarios.forEach(usuarioInfo => {
            var user = this.getUserFila(usuarioInfo);
            this.userList.push(user);

          });
          this.dataSource.data = this.userList;
          console.log(this.dataSource.data)
        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }


        });
      }else{
        this.serviceSubscribe = this.userService.getUsersByCentro(this.user.codigoCentro).pipe(first())
      .subscribe(
        data => {
          let usuarios = data["usuarios"];

          usuarios.forEach(usuarioInfo => {
            console.log(usuarioInfo);
            var user = this.getUserFila(usuarioInfo);
           
            this.userList.push(user);

          });
          this.dataSource.data = this.userList;
          console.log(this.dataSource.data)
        },
        error => {
          if(error.status == 401 && error.error.errors == "Sesión expirada"){
            AppComponent.myapp.openDialogSesion();                             
          }
          else if (error.status == 406) {
            const res = new Array();
            res.push("Petición incorrecta.");
            AppComponent.myapp.openDialog(res);
          }


        });
      }
  }
  getUserFila(usuarioInfo){
    console.log(usuarioInfo)
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
      fpId:usuarioInfo.fpDual,
      codigoCent: usuarioInfo.codigoCentro,
      rolId: usuarioInfo.rol
    }
    return user;
  }
  private filter() {

    this.dataSource.filterPredicate = (data: User, filter: string) => {
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

  edit(data: User) {
    console.log("Le doy a editar")
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
              if(error.status == 401 && error.error.errors == "Sesión expirada"){
                AppComponent.myapp.openDialogSesion();                             
              } else if (error.status == 406) {
                const res = new Array();
                res.push("Petición incorrecta.");
                AppComponent.myapp.openDialog(res);
              }
              else{
              const res = new Array();
              res.push("No se ha podido borrar.");
              AppComponent.myapp.openDialog(res);
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
