import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Keyboard, Virtual } from "swiper";
import { SpeakingService } from '../shared/services/speaking.service';

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
    },
    {
      'nameOne': 'Silben lesen',
      'linkOne': 'reading-phenomene',
    },
    {
      'nameOne': 'Wörter lesen',
      'linkOne': 'reading-words',
    },
    {
      'nameOne': 'Wörter schreiben',
      'linkOne': 'writing-words',
    }
  ]

  constructor() {}

  ngOnInit(): void {
  }

}
