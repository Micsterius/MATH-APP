import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  editUserName: boolean = false;
  editUserId: boolean = false;
  editUserMail: boolean = false;
  editUserPw: boolean = false;

 
  
  constructor(
    public authService: AuthService
  ) {

  }


  

  ngOnInit(): void {
  }

}
