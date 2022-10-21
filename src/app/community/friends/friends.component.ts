import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private firestore: AngularFirestore
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
        console.log(this.myFriends)
        this.show = true;
      })
    }
  }
}
