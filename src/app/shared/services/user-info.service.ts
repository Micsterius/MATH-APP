import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  users: any[] = [];
  usersAdditionalInfos: any[] = [];
  constructor() { }

  //load all users datas (displayName => name; email: Mail; photoURL => image src)
  async loadUsers() {
    let q = query(collection(this.db, "users"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = [];
      querySnapshot.forEach((doc) => {
        this.users.push(doc.data())
      })
    });
  }

  //load all users additional datas (isOnline => true/false; isAway: true/false; timeStampLastActivity; uid => user id; phoneNumber)
  async loadUsersAdditionalInfos() {
    let q = query(collection(this.db, "more-user-infos"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.usersAdditionalInfos = [];
      querySnapshot.forEach((doc) => {
        this.usersAdditionalInfos.push(doc.data())
      })
    });
  }

  returnUsersDisplayName(uid) {
    let user = this.users.find(user => user.uid == uid)
    if (user == undefined) return 'Anonym'
    else return user.displayName
  }
}
