import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './authorization.service';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private cookieService: CookieService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.cookieService.get('token');
    // decode the token to get its payload
    var userCookie = (JSON.parse(this.cookieService.get('user')));
    var user = Number(userCookie.rol)
    if (!this.auth.isAuthenticated() || user !== expectedRole) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}