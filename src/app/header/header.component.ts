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
  }

  ngOnInit(): void {
  }

  backToStartScreen() {
    this.generalService.inExercise = false;
  }

  themeBurgundy() {
    document.documentElement.style.setProperty('--main-color', '#870A30');
    document.documentElement.style.setProperty('--secondary-color', '#F2C5E0');
    document.documentElement.style.setProperty('--background-color', '#ECD5E6');
    localStorage.setItem('mainColor', '#870A30');
    localStorage.setItem('secColor', '#F2C5E0');
    localStorage.setItem('backgroundColor', '#ECD5E6');
  }

  themeBlue() {
    document.documentElement.style.setProperty('--main-color', '#294571');
    document.documentElement.style.setProperty('--secondary-color', '#C4E0E5');
    document.documentElement.style.setProperty('--background-color', '#5A86AE');
    localStorage.setItem('mainColor', '#294571');
    localStorage.setItem('secColor', '#C4E0E5');
    localStorage.setItem('backgroundColor', '#5A86AE');

  }

  themeOrange() {
    document.documentElement.style.setProperty('--main-color', '#fe8801');
    document.documentElement.style.setProperty('--secondary-color', '#ffdbb2');
    document.documentElement.style.setProperty('--background-color', '#fff9f1');
    localStorage.setItem('mainColor', '#fe8801');
    localStorage.setItem('secColor', '#ffdbb2');
    localStorage.setItem('backgroundColor', '#fff9f1');
  }

  themeDarkViolett() {
    document.documentElement.style.setProperty('--main-color', '#42324f');
    document.documentElement.style.setProperty('--secondary-color', '#afa1bd');
    document.documentElement.style.setProperty('--background-color', '#faf3fe');
    localStorage.setItem('mainColor', '#42324f');
    localStorage.setItem('secColor', '#afa1bd');
    localStorage.setItem('backgroundColor', '#faf3fe');
  }
}
