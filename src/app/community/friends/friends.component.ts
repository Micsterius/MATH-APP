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
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    this.myFriends.length = 0;
    this.loadAllFriends();
    chatServ.loadChats();
  }

  ngOnInit(): void {
  }

  async loadAllFriends() {
    let docRef = doc(this.db, "users", this.actualUser.uid)
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.user = docSnap.data();
      this.loadDetailsOfFriends();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async loadDetailsOfFriends() {
    for (let i = 0; i < this.user.friends.length; i++) {
      const friendUid = this.user.friends[i];
      let docRef = doc(this.db, "users", friendUid)
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.myFriends.push(docSnap.data())
        console.log("my friends list",this.myFriends)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    this.show = true
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
