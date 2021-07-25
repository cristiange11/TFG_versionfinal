import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewChecked {
  items: MenuItem[];


  constructor(private changeDetector: ChangeDetectorRef, private router: Router, private cookieService: CookieService) {

  }
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnInit(): void {
    this.obtenerItems();
    

  }
  closeSession() {
    const res = new Array();
    res.push("Sesión expirada");
    AppComponent.myapp.openDialog(res);
    this.cookieService.deleteAll();
    this.router.navigate(['home']);
  }
  obtenerItems() {

    if (!this.cookieService.get('user')) {
      this.items = [
        {
          label: 'Iniciar Sesión',
          routerLink: '/login'
        },

      ];
    }
    else {
      var user = JSON.parse(this.cookieService.get('user'));
      if (Number(user.rol) == 1) {
        this.items = [
          {
            label: 'Logs',
            icon: 'pi pi-fw pi-file',
            routerLink: '/log'
            
          },
          {
            label: 'FP duales',
            routerLink: '/fpdual',
            icon: "fas fa-graduation-cap"
          },
          {
            label: 'Editar Perfil',
            routerLink: '/editprofile',
            icon: "far fa-user"
          },
          {
            label: 'Usuarios',
            routerLink: '/usuario',
            icon: "fas fa-users"
          },
          {
            label: 'Empresas',
            routerLink: '/empresa',
            icon: "fas fa-building"
          },
          {
            label: 'Registrar Usuario',
            routerLink: '/formuser',
            icon: "fas fa-user-plus"
          },
          {
            label: 'Cerrar Sesión',
            routerLink: '/home',
            icon: "fas fa-sign-out-alt",
            command: () => this.closeSession(),
          },
        ]
      }
    }
  }
}
