import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { doc, updateDoc, arrayUnion, arrayRemove, QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query } from '@angular/animations';



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
  currentUser: User
  friends: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public authService: AuthService) {
    let actualUser = JSON.parse(localStorage.getItem('user'))
    this.getAlreadyAddedFriends(actualUser.uid);
  }

  ngOnInit(): void { }

  loadsearch() {
    if (this.searchValue !== '') {
      this.firestore.collection(`users`, ref => ref
        .orderBy("displayName")
        .startAt(this.searchValue)
        .limit(6))
        .valueChanges()
        .subscribe((obj: User[]) => {
          this.users = obj;
          this.filterUsers();
        });
    }
    else this.users = [];
  }

  filterUsers() {
    if (this.searchValue.length > 0) {
      this.userNames = [];
      //push all UserNames of fkt loadsearch in temporary Array userNames
      for (let i = 0; i < this.users.length; i++) {
        const displayName = this.users[i].displayName;
        this.userNames.push(displayName)
      }

      /*filter the names in the array userNames as only userNames which match with dhe input 
      **e.g. input "Ma" => search output name "Maria" show, name "Michael" hide
      */
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

  checkIfUserIsItself(uid) {
    if (this.authService.userData.uid == uid) {
      return false;
    }
    else return true;
  }

  getAlreadyAddedFriends(uid) {
    this.firestore.collection('users')
      .doc(uid)
      .valueChanges()
      .subscribe((user: any) => {
        this.currentUser = user;
      })
  }
  //muss noch so programmiert werden, dass die fkt erst ausgeführt wird, wenn das Laden der Freunde abgeschlossen ist
  userAlreadyAddedAsFriend(uid) {
    return this.currentUser.friends.indexOf(uid) > -1
  }

  addUserAsFriend(uid) {
    this.firestore.collection('users')
      .doc(this.authService.userData.uid)
      .update({ friends: arrayUnion(uid) })
    /*await updateDoc(doc(this.db, 'users', this.authService.userData.uid), {
      friends: arrayUnion(uid)
    })*/
  }
}

