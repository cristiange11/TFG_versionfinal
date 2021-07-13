import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Centro } from '../../models/Centro';
import {CentroService} from '../../services/centro.service';
import { AppComponent } from '../../app.component';

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
  constructor(private centroService: CentroService) {
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

  add(centro: Centro) {
    this.centroService.addCentro(centro);
    this.centroList.push(centro);
  }
  edit(centro: Centro) {
    this.centroService.updateCentro(centro);
  }

  delete(codigoCentro: string) {
    this.centroService.deleteCentro(codigoCentro);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
  
}
