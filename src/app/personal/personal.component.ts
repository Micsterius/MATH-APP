import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  editUserSensitive: boolean = false;
  checkIfPasswordChanged: boolean = false;
  activeUser;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  @Input() newPasswort: any;

  constructor(
    public authService: AuthenticationService,
    public afs: AngularFirestore,) {
    this.activeUser = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
  }

  closeMoreSettings() {
    this.checkIfPasswordChanged = false;
    this.editUserSensitive = !this.editUserSensitive;
  }

  profileEditSensitiveInfos() {
    this.authService.changeUserDataMail(this.activeUser.email);
    this.changeUserDataMailFirestore();
    if (this.checkIfPasswordChanged) this.authService.changeUserDataPw(this.newPasswort);
    this.editUserSensitive = !this.editUserSensitive;
  }

  async changeUserDataMailFirestore() {
    if (await this.authService.UserDataExist()) {
      this.afs.collection('users')
        .doc(this.activeUser.uid)
        .update({ email: this.activeUser.email })
        .then(() => {
        }).catch((error) => {
          window.alert(error.message);
        });
    }
  }
}
