import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild('mailField') userPwd!: ElementRef;

  constructor(
    public authService: AuthService
  ) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.minLength(5)) ;

  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

}
