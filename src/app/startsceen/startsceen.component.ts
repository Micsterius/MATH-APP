import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Keyboard, Virtual } from "swiper";

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-startsceen',
  templateUrl: './startsceen.component.html',
  styleUrls: ['./startsceen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartsceenComponent implements OnInit {

  buttons: any[] = [
    {
      'nameOne': 'Kopfrechnen',
      'linkOne': 'arithmetic',
      'nameTwo': 'Einstellungen',
      'linkTwo': 'settings',
    },
    {
      'nameOne': 'Silbenlesen',
      'linkOne': 'reading-phenomene',
      'nameTwo': 'Einstellungen',
      'linkTwo': '',
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
