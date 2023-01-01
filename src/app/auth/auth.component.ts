import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showForgotPassword: boolean = false;
  showVerifyMail: boolean = false;
  showSignUp: boolean = false;
  showSignIn: boolean = true;
  
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
