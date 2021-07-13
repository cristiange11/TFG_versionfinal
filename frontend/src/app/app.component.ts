import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import titles from './files/titles.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  static myapp;
  constructor(public dialog: MatDialog) {
    AppComponent.myapp=this;
  }
  getTitle(param: string) {
    return titles[param] != undefined ? titles[param] : param;
  }
  openDialog(texto: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { texto: texto }
    });
  }
  openDialogDelete(texto: string): void{
    
  }
}
