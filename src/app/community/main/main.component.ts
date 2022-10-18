import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  searchValue: string = "";
  users: User[] = [];
  showUser: boolean = false;
  userNames: string[] = [];
  searchMatchesUsers: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public authService: AuthService) {

  }

  ngOnInit(): void {

  }

  loadsearch() {
    /* if (this.searchValue !== '') {
       this.firestore.collection(`users`, ref => ref
         .orderBy("displayName")
         .startAt(this.searchValue)
         .limit(6))
         .valueChanges()
         .subscribe((obj: User[]) =>
           this.users = obj
         );
       console.log(this.users)
 
       this.filterUsers();
     }
     else this.users = [];*/
  }

  filterUsers() {
    if (this.searchValue.length > 0) {
      this.userNames = [];
      for (let i = 0; i < this.users.length; i++) {
        const displayName = this.users[i].displayName;
        this.userNames.push(displayName)
      }
      this.searchMatchesUsers = [];
      this.searchMatchesUsers = this.userNames.filter(editor => {
        const regex = new RegExp(`^${this.searchValue}`, "gi")
        return editor.match(regex)
      })
    }
  }

  navigateToChat() {
    this.router.navigate(['/chat'])
  }

  navigateToFriends() {
    this.router.navigate(['/friends'])
  }
  validate(name) {
    return this.searchMatchesUsers.indexOf(name) > -1;
  }

  addUserAsFriend(uid) {
    console.log(uid)
    console.log(this.authService.userData.uid)
    console.log(this.authService.userData.uid)
    this.firestore.collection('users')
    .doc(this.authService.userData.uid)
    .update({friends: arrayUnion(uid)})
    /*await updateDoc(doc(this.db, 'users', this.authService.userData.uid), {
      friends: arrayUnion(uid)
    })*/
  }
}

