import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {NavigationComponent} from '../navigation/navigation.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enlace;
  images:any[]=[
    {img: '../../../assets/img/tipo.jpg'},
    {img: '../../../assets/img/carpinteria.jpg'}, 
    {img: '../../../assets/img/clase_3.jpg'}
    
  ];
  constructor(private navigationComponent: NavigationComponent, private router: Router, private cookieService: CookieService, private _config:NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    document.body.style.background="white";
   }
  ngOnInit(): void {
    this.navigationComponent.obtenerItems();
    if(!this.cookieService.get('user')){
      this.router.navigate(['home']);
    }
    else{
      var user =(JSON.parse(this.cookieService.get('user')));
    if(Number(user.rol)==1){
      this.router.navigate(['adminpage']);
    }else if(Number(user.rol)==2){
      this.router.navigate(['fpdual']);
    }else if(Number(user.rol) == 4){
      this.router.navigate(['modulo']);
    }
    
    }
  }

}
