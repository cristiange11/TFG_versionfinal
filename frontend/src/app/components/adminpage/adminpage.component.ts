import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from '../../models/Centro';
import {CentroService} from '../../services/centro.service';
import {FpdualesService} from '../../services/fpduales.service';
import { AppComponent } from '../../app.component';
import  {DeleteComponent } from '../modals/delete/delete.component';
import {CentroUpdateComponent} from '../modals/centro-update/centro-update.component';
import {CentroDeleteConfirmationComponent} from '../modals/centro-delete-confirmation/centro-delete-confirmation.component';
import { CentroCreateComponent } from '../modals/centro-create/centro-create.component';
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

  public displayedColumns: string[] = ['codigo_centro', 'nombre', 'provincia', 'direccion', 'CP', 'telefono', 'correo'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Centro>;
  private serviceSubscribe: Subscription;
  constructor(private fpService: FpdualesService, private centroService: CentroService, public dialog: MatDialog) {
   // this.centroList$ = new BehaviorSubject([]);
   this.dataSource = new MatTableDataSource<Centro>();
   }

  ngOnInit(): void {
    this.getAll();
    

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
          console.log(error.error.message);
        });
  }

  add() {
    const dialogRef = this.dialog.open(CentroCreateComponent, {
      width: '400px',
      data: "aoal"
    });
  }
  edit(data: Centro) {
    
    const dialogRef = this.dialog.open(CentroUpdateComponent, {
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
            if(error.status == 409){
              const dialogRef2 = this.dialog.open(CentroDeleteConfirmationComponent);
              dialogRef2.afterClosed().subscribe( result => {
                  if(result){
                    this.fpService.deleteFPByCentro(codigoCentro).pipe(first())
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
