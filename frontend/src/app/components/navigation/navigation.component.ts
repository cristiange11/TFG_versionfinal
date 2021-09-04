import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';


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

    this.cookieService.deleteAll();
    this.router.navigate(['home']);
  }
  deleteSessionFp() {
    sessionStorage.removeItem('codigoCentro');
  }
  obtenerItems() {
    const editarPerfil = { label: 'Editar Perfil', routerLink: '/editprofile', icon: "far fa-user" };
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
      if (Number(user.rol) == 1 || Number(user.rol) == 2) {
        this.items = [];
        if (Number(user.rol) == 1){
          this.items.push({
            label: 'Centros',
            routerLink: '/adminpage',
            icon: "fas fa-school"
          })
        }
        this.items.push(
          {
            label: 'FP duales',
            routerLink: '/fpdual',
            icon: "fas fa-graduation-cap",
            command: () => this.deleteSessionFp(),
          },

          editarPerfil,

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
            label: 'Registrar usuario',
            routerLink: '/formuser',
            icon: "fas fa-user-plus"
          },

        );
        if (Number(user.rol) == 1) {
          this.items.push({
            label: 'Logs',
            icon: 'pi pi-fw pi-file',
            routerLink: '/log'

          });
        }
      }
      else {
        this.items = [
          {
            label: 'Módulos',
            routerLink: '/modulo',
            icon: 'fa fa-book'
          },
          editarPerfil,
        ]
      }
      this.items.push({
        label: 'Cerrar Sesión',
        routerLink: '/home',
        icon: "fas fa-sign-out-alt",
        command: () => this.closeSession(),
      });
    }
  }
}
