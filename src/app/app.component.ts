import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { GeneralService } from './shared/services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'math-app';
  windowWidth: any;
  windowHeight: any;

  constructor(
    public authService: AuthenticationService,
    public generalService: GeneralService) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) this.authService.showLoginArea = false;
    else this.authService.showLoginArea = true;
  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    if (window.innerWidth < 350){}
    if (window.innerHeight < 740){}
  }

  @HostListener('window:resize', ['$event'])

  resizeWindow() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    if (this.windowWidth < 800){}
    if (this.windowWidth > 800){}
  }

}
/**
 * Next Tasks
 * speak only run one time per click, then await 2sek to activate again.
 */