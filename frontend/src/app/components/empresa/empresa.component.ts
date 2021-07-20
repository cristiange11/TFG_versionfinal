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
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { NavigationComponent } from '../navigation/navigation.component';
import {EmpresaCreateComponent} from 'src/app/components/modals/empresa/empresa-create/empresa-create.component';
import { EmpresaUpdateComponent } from '../modals/empresa/empresa-update/empresa-update.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { EmpresaDeleteConfirmationComponent } from '../modals/empresa/empresa-delete-confirmation/empresa-delete-confirmation.component';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit , OnDestroy, AfterViewInit{
  myApp = AppComponent.myapp;
  empresaList: Array<Empresa> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['cifEmpresa', 'nombre', 'direccion', 'telefono', 'correo','url'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Empresa>;
  private serviceSubscribe: Subscription;
  constructor( private router: Router, private nagivationComponent: NavigationComponent, private cookieService: CookieService, private empresaService: EmpresaService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Empresa>();
    document.body.style.background = "linear-gradient(to right,#c8aeee, #94e9ad)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  ngOnInit(): void {
    this.nagivationComponent.obtenerItems();
    this.getAll();
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      var user =(JSON.parse(this.cookieService.get('user')));
    if(Number(user.rol)!=1){
      this.router.navigate(['home']);
    }
    
    }
  }
  getAll() {
    this.serviceSubscribe = this.empresaService.getEmpresas().pipe(first())
      .subscribe(
        data => {
          
          let empresas = data["empresas"];
         
          empresas.forEach(empresaInfo => {          
            this.empresaList.push(empresaInfo);
            
          });
          console.log(this.empresaList)
            this.dataSource.data = this.empresaList
        },
        error => {
          console.log(error.error.message);
        });
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Empresa, filter: string) => {
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
    const dialogRef = this.dialog.open(EmpresaCreateComponent, {
      width: '400px'
    });
  }
  edit(data: Empresa) {
    
    const dialogRef = this.dialog.open(EmpresaUpdateComponent, {
      width: '400px',
      data: data
    });
    
  }

  delete(CIF: string) {
    
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empresaService.deleteEmpresa(CIF).pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
           if(error.status == 409){
              const dialogRef2 = this.dialog.open(EmpresaDeleteConfirmationComponent);
              dialogRef2.afterClosed().subscribe( result => {
                  if(result){
                    this.empresaService.deleteTutorEmpresaByEmpresa(CIF).pipe(first())
                    .subscribe(
                      data => {
                          window.location.reload();
                      },
                      error => {
                        const res = new Array();
                        res.push("No se ha podido borrar.");
                        AppComponent.myapp.openDialog(res);
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
