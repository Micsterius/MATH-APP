import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: any;
  allChatsId: any;
  allChats: any;
  arrayOfFriendsWithChatUid: string[] = [];
  arrayOfFirendsWithChat: any[] = [];
  constructor(
    private firestore: AngularFirestore,) {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    setTimeout(() => {
      this.loadChats()
    }, 500);

  }

  ngOnInit(): void {
  }

  async loadChats() {
    this.allChatsId = query(collection(this.db, "posts"), where("authors", "array-contains", this.actualUser.uid));
    this.allChats = await getDocs(this.allChatsId);
    this.allChats.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().authors[0] != this.actualUser.uid) this.arrayOfFriendsWithChatUid.push(doc.data().authors[0]);
      if (doc.data().authors[1] != this.actualUser.uid) this.arrayOfFriendsWithChatUid.push(doc.data().authors[1]);
      this.getUserInfo()
    });
  }

  async getUserInfo() {
    this.arrayOfFirendsWithChat.length = 0;
    this.arrayOfFriendsWithChatUid.forEach(async (uid) => {
      let docRef = doc(this.db, "users", uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists() && !this.noObjectContainsAlreadySameUid(uid)) {
        this.arrayOfFirendsWithChat.push(docSnap.data())
        console.log(docSnap.data()["uid"]);
        console.log(this.arrayOfFirendsWithChat);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
  }

  noObjectContainsAlreadySameUid(friendUid) {
    console.log (friendUid)
    console.log (this.arrayOfFirendsWithChat)
    console.log (this.arrayOfFriendsWithChatUid)
    return this.arrayOfFirendsWithChat.some((uid) => uid == friendUid)
  }

  async getAllDocsInSubCollection(postId) {
    let docsSnap = await getDocs(collection(this.db, "posts", postId, "text"));
    docsSnap.forEach((doc) => {
      console.log(doc.data());

    });
  }
}
