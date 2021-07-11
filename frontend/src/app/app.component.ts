import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
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

  openDialog(texto: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { texto: texto }
    });
  }
}
