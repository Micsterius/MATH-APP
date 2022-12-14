import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { GeneralService } from '../shared/services/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public generalService: GeneralService) {
    let x = (location.pathname + location.search).substr(1)
    if (x == 'arithmetic' || x == 'reading-phenomene' || x == 'reading-words' || x == 'writing-words') this.generalService.inExercise = true;
    else this.generalService.inExercise = false;
     //header einblenden wenn in der URL nichts steht(startscreen) oder in der url path settings oder triumph stehen     
  }

  ngOnInit(): void {
  }

  backToStartScreen() {
    this.generalService.inExercise = false;
  }
}
