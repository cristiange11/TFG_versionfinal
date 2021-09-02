import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthorizationService, public router: Router, private cookieService: CookieService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    var user;
    //Comprobar si el usuario está autentificado
    if (this.auth.isAuthenticated()) {
      var userCookie = (JSON.parse(this.cookieService.get('user')));
      user = Number(userCookie.rol)
    }
    //Comprobar que cualquier usuario autentificado pueda navegar a esa página
    if (this.auth.isAuthenticated() && expectedRole === undefined) {
      return true;
    }
    //Comprobar si el usuario no está autentificado o no puede navegar a la página introducida
    else if (!this.auth.isAuthenticated() || !expectedRole.includes(user)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
