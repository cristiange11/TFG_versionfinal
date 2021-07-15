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
          label:'Editar Perfil',
          routerLink:'/editprofile',
          icon: "far fa-user"
        },
        {
          label:'Empresas',
          routerLink:'/empresa',
          icon: "fas fa-building"
        },
        {
          label:'Registrar Usuario',
          routerLink:'/formuser',
          icon: "fas fa-user-plus"
        },
        {
            label:'Cerrar Sesión',
            routerLink:'/home',
            icon : "fas fa-sign-out-alt",
            command: () => this.closeSession(),
        },
      ]
    }
  }
}
