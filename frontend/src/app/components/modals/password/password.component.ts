import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private router: Router, private nagivationComponent: NavigationComponent,public dialogRef: MatDialogRef<PasswordComponent>) { }

  ngOnInit(): void {
  }
  onOKClick(): void {
    this.dialogRef.close();
    this.router.navigate(['login']);
  }
}
