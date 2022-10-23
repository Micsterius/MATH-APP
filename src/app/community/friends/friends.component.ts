import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { arrayRemove } from 'firebase/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  actualUser: any;
  user: any;
  show:boolean = false;
  myFriends: any[];
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public authService: AuthService
  ) {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    this.loadAllFriends()
  }

  ngOnInit(): void {
  }

  loadAllFriends() {
    this.firestore.collection(`users`)
      .doc(this.actualUser.uid)
      .valueChanges()
      .subscribe((user) => {
        this.user = user
        console.log(this.user.friends)
        this.loadDetailsOfFriends()
      })
  }

  loadDetailsOfFriends(){
    this.myFriends = [];
    for (let i = 0; i < this.user.friends.length; i++) {
      const friendUid = this.user.friends[i];
      this.firestore.collection(`users`)
      .doc(friendUid)
      .valueChanges()
      .subscribe((user) => {
        this.myFriends.push(user)
        this.show = true;
      })
    }
  }

  navigateToChat() {
    this.router.navigate(['/chat'])
  }

  deleteFriendFromList(uid){
      this.firestore.collection('users')
        .doc(this.authService.userData.uid)
        .update({ friends: arrayRemove(uid) })
  }
}
