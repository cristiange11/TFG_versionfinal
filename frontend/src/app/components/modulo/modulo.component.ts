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
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.descripcion.toLowerCase().includes(filter) || data.curso.toString() === filter;
    };
    this.nagivationComponent.obtenerItems();
   
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      this.user =(JSON.parse(this.cookieService.get('user')));
    if(Number(this.user.rol)!=1 && Number(this.user.rol)!=2 && Number(this.user.rol) != 4 && Number(this.user.rol) != 3 ){
      this.router.navigate(['home']);
    }
    
    }
    this.getAll();
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
  getCalificacion(codigoModulo){    
    sessionStorage.setItem('codigoModulo', codigoModulo.toString());
    this.router.navigate(['calificacion']);
  }
  obtenerModulosProf(dni){
    this.serviceSubscribe = this.moduloService.getModulosProf(dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {      
                
            this.moduloList.push(moduloInfo);
            console.log(moduloInfo)
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
  obtenerModulosTut(dni){
    this.serviceSubscribe = this.moduloService.getModulosTut(dni).pipe(first())
      .subscribe(
        data => {
          let modulos = data["modulos"];
          modulos.forEach(moduloInfo => {      
                
            this.moduloList.push(moduloInfo);
            console.log(moduloInfo)
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
  
  public doFilter = (value: { target: HTMLInputElement }) => {
    const filterValue =  value.target.value.trim().toLocaleLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  getAll() {
    console.log("Usuario => " + this.user.rol)
    if(Number(this.user.rol) == 1 || Number(this.user.rol) == 2){
      this.columnsToDisplay  = [...this.displayedColumns, 'actions', 'resultadoAprendizaje', 'encuesta', 'calificacion'];
    this.obtenerModulosAdmin(Number(sessionStorage.getItem('fpDual')));
      
      }else if (Number(this.user.rol) == 4){
        this.columnsToDisplay  = [...this.displayedColumns,  'resultadoAprendizaje', 'encuesta', 'calificacion'];
        this.obtenerModulosProf(this.user.dni);
      }else if (Number(this.user.rol) == 3){
        this.columnsToDisplay  = [...this.displayedColumns,  'resultadoAprendizaje', 'encuesta'];
        this.obtenerModulosTut(this.user.dni);
      }
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
