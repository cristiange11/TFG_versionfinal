import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  constructor(private  nagivationComponent: NavigationComponent,public dialogRef: MatDialogRef<SesionComponent>) { }

  ngOnInit(): void {
  }
  onOKClick(): void {
    this.dialogRef.close();
    this.nagivationComponent.closeSession(); 
  }

}
