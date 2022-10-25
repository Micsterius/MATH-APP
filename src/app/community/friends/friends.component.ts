import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { addDoc, arrayRemove, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: any;
  user: any;
  show: boolean = false;
  myFriends: any[] = [];
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public authService: AuthService,
    public chatServ: ChatService
  ) {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    this.loadAllFriends()
    chatServ.loadChats()
  }

  ngOnInit(): void {
  }

  loadAllFriends() {
    this.firestore.collection(`users`)
      .doc(this.actualUser.uid)
      .valueChanges()
      .subscribe((user) => {
        this.user = user;
        this.loadDetailsOfFriends();
      })
  }

  loadDetailsOfFriends() {
    this.myFriends.length = 0;
    for (let i = 0; i < this.user.friends.length; i++) {
      const friendUid = this.user.friends[i];
      this.firestore.collection(`users`)
        .doc(friendUid)
        .valueChanges()
        .subscribe((user) => {
          this.myFriends.push(user)
          if (this.user.friends.length == this.myFriends.length) this.show = true;
        })
    }
  }

  navigateToChat() {
    this.router.navigate(['/chat'])
  }

  deleteFriendFromList(uid) {
    this.firestore.collection('users')
      .doc(this.authService.userData.uid)
      .update({ friends: arrayRemove(uid) })
  }

  navigateToMain() {
    this.router.navigate(['/main-community'])
  }



  navigateToChatWithFriend() {
    this.router.navigate(['/chat-friend'])
  }
}
