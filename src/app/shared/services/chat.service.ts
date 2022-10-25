import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: any;
  allChatsId: any;
  allChats: any;
  showChatsWithFriends: boolean = false;
  arrayOfFriendsWithChatUid: string[] = [];
  arrayOfFirendsWithChat: any[] = [];

  constructor(private router: Router) {
  }
  async loadChats() {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
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
      if (docSnap.exists()) {
        if (!this.arrayOfFirendsWithChat.some((friend) => friend.uid == docSnap.data()["uid"])) { //user is not already in array
          this.arrayOfFirendsWithChat.push(docSnap.data())
        }
        if (this.arrayOfFriendsWithChatUid.length == this.arrayOfFirendsWithChat.length) this.showChatsWithFriends = true;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
  }

  async getAllDocsInSubCollection(postId) {
    let docsSnap = await getDocs(collection(this.db, "posts", postId, "text"));
    docsSnap.forEach((doc) => {
      console.log(doc.data());
    });
  }

  async addFriendToChatList(friendUid) {
    if (!this.friendChatDocAlreadyExist(friendUid)) {
      let docRef = await addDoc(collection(this.db, "posts"), {
        authors: [this.actualUser.uid, friendUid],
      });
      this.arrayOfFriendsWithChatUid.push(friendUid);
    }
    else console.log('already doc exist');
    this.navigateToChatWithFriend()
  }

  friendChatDocAlreadyExist(friendUid) {
    if (this.arrayOfFriendsWithChatUid.indexOf(friendUid) > -1) return true;
    else return false;
  }

  navigateToChatWithFriend() {
    this.router.navigate(['/chat-friend'])
  }
}
