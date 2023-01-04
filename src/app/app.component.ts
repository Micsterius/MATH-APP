import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'math-app';
  constructor(public authService: AuthenticationService){
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) this.authService.showLoginArea = false;
    else this.authService.showLoginArea = true;
  }
}

/**
 * Next Tasks
 * speak only run one time per click, then await 2sek to activate again.
 * create math challenge between two friends
 * in case of add friend start a request to the oter, if he/she accepts you as a friend. Add the user to the list of the added friend
 */