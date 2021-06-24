import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images:any[]=[
    {img: '../../../assets/img/tipo.jpg'},
    {img: '../../../assets/img/carpinteria.jpg'}, 
    {img: '../../../assets/img/clase_3.jpg'}
    
  ];
  constructor(private _config:NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    document.body.style.background="white";
   }
  ngOnInit(): void {
  }

}
