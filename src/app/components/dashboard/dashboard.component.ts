import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    public authService: AuthService,
    public afs: AngularFirestore
  ) {
  }




  ngOnInit(): void {
  }

  changeUserDataNameFirestore(newName) {
    this.afs.collection('users')
      .doc(this.authService.userData.uid)
      .update({displayName: newName})
      .then(() => {
        console.log('Name updated');
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  changeUserDataMailFirestore(newMail) {
    this.afs.collection('users')
      .doc(this.authService.userData.uid)
      .update({email: newMail})
      .then(() => {
        console.log('Mail updated');
      }).catch((error) => {
        window.alert(error.message);
      });
  }
}
