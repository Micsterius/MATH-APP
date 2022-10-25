import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { addDoc, arrayRemove, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
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
        this.loadDetailsOfFriends()
      })
  }

  loadDetailsOfFriends() {
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

  deleteFriendFromList(uid) {
    this.firestore.collection('users')
      .doc(this.authService.userData.uid)
      .update({ friends: arrayRemove(uid) })
  }

  navigateToMain() {
    this.router.navigate(['/main-community'])
  }

  async addFriendToChatList(friendUid) {
    let docRef = await addDoc(collection(this.db, "posts"), {
      authors: [this.actualUser.uid, friendUid],
    })
   console.log(docRef.id)/* */
   // this.navigateToChatWithFriend()
    this.checkIfAlreadyPostsDocExist(friendUid)
    /* this.firestore.collection('posts')
       .add({
         authors: [this.actualUser.uid, friendUid],
       })*/
  }

  navigateToChatWithFriend() {
    this.router.navigate(['/chat-friend'])
  }

  async checkIfAlreadyPostsDocExist(friendUid) {
    let docRef = query(collection(this.db, "posts"), where("authors", 'array-contains', [friendUid, this.actualUser.uid]));
    let querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    /*
        let a = this.firestore.collection(`posts`, ref => ref
          .where("authors", 'array-contains', [friendUid, this.actualUser.uid]));
        let docSnap = await getDoc(a);
        if (docSnap.exists()) {
          // Convert to City object
          const city = docSnap.data();
          // Use a City instance method
          console.log(city.toString());
        } else {
          console.log("No such document!");
        }*/
  }
}
