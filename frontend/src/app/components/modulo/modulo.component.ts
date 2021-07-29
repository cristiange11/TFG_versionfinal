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
import { Fpduales } from 'src/app/models/Fpduales';
import { Modulo } from 'src/app/models/Modulo';
import { ModuloService } from 'src/app/services/modulo.service';
import { FpdualComponent } from '../fpdual/fpdual.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ModuloCreateComponent } from '../modals/modulo/modulo-create/modulo-create.component';
import { ModuloUpdateComponent } from '../modals/modulo/modulo-update/modulo-update.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit, OnDestroy, AfterViewInit {
  myApp = AppComponent.myapp;
  user;
  moduloList: Array<Modulo> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['nombre', 'descripcion', 'curso'];
  
  public columnsToDisplay: string[];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Modulo>;
  private serviceSubscribe: Subscription;
  constructor( private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private moduloService: ModuloService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Modulo>();
    document.body.style.background = "linear-gradient(to right, #aeeecd, #8433cf)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

   }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
   
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      this.user =(JSON.parse(this.cookieService.get('user')));
      console.log("Usuario => " + this.user.rol)
    if(Number(this.user.rol)!=1 && Number(this.user.rol)!=2 && Number(this.user.rol) != 4){
      this.router.navigate(['home']);
    }
    
    } this.getAll();
  }
  obtenerModulosAdmin(fpDual){
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
  
  getAll() {
    console.log("Usuario => " + this.user.rol)
    if(Number(this.user.rol) == 1 || Number(this.user.rol) == 2){
      this.columnsToDisplay  = [...this.displayedColumns, 'actions', 'resultadoAprendizaje', 'encuesta'];
    this.obtenerModulosAdmin(Number(sessionStorage.getItem('fpDual')));
      
      }else{
        this.columnsToDisplay  = [...this.displayedColumns,  'resultadoAprendizaje', 'encuesta'];
        this.serviceSubscribe = this.moduloService.getModulosProfAlumnTutor(this.user.dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {          
            this.moduloList.push(moduloInfo);
            
          });
          
            this.dataSource.data = this.moduloList;
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
  private filter() {

    this.dataSource.filterPredicate = (data: Modulo, filter: string) => {
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
  add() {
    const dialogRef = this.dialog.open(ModuloCreateComponent, {
      width: '400px'
    });
  }
  edit(data: Modulo) {
    console.log(data)
    const dialogRef = this.dialog.open(ModuloUpdateComponent, {
      width: '400px',
      data: data
    });
    
  }
  getResultadosAprendizaje(codigoModulo){
    console.log(codigoModulo)
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    
    this.router.navigate(['resultadoaprendizaje']);
  }
  getEncuesta(codigoModulo){
    console.log(codigoModulo)
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    
    this.router.navigate(['encuesta']);
  }
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent);
    console.log(id)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moduloService.deleteModulo(id).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
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
