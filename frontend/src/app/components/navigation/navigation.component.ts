import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewChecked {
  items: MenuItem[];

  
  constructor(private changeDetector : ChangeDetectorRef,private cookieService: CookieService) {
    
  }
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnInit(): void {
    this.obtenerItems();
    
    
  }
  closeSession() {
    this.cookieService.deleteAll();
  }
  obtenerItems(){
    if(this.cookieService.get('rol')==""){
      this.items = [
        {
            label:'Iniciar Sesión',
            routerLink:'/login'
        },
        
    ];
    }
    if(Number(this.cookieService.get('rol'))==1){
      this.items = [
        {
          label:'Registrar Usuario',
          routerLink:'/formuser'
        },
        {
            label:'Cerrar Sesión',
            routerLink:'/home',
            command: () => this.closeSession(),
        },
      ]
    }
  }
}
