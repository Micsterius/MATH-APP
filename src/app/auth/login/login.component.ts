import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  goToSignUp(){
    this.authService.showSignIn = false;
    this.authService.showSignUp = true;
  }

  goToForgotPassword(){
    this.authService.showSignIn = false;
    this.authService.showForgotPassword = true;
  }

}
