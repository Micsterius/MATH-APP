import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
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
  arrayOfFriendsWithChatUid: any[] = [];
  arrayOfFirendsWithChat: any[] = [];
  currentChatId: any = '';

  constructor(private router: Router) {
  }

  async loadChats() {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    this.allChatsId = query(collection(this.db, "posts"), where("authors", "array-contains", this.actualUser.uid));
    this.allChats = await getDocs(this.allChatsId);
    this.allChats.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().authors[0] != this.actualUser.uid) this.arrayOfFriendsWithChatUid.push({author: doc.data().authors[0], id: doc.data().id});
      if (doc.data().authors[1] != this.actualUser.uid) this.arrayOfFriendsWithChatUid.push({author: doc.data().authors[1], id: doc.data().id});
      console.log(doc.id, " => ", doc.data());
      this.getUserInfo()
    });
  }

  async getUserInfo() {
    this.arrayOfFirendsWithChat.length = 0;
    this.arrayOfFriendsWithChatUid.forEach(async (obj) => {
      let docRef = doc(this.db, "users", obj.author);
      let docSnap = await getDoc(docRef);
      let user;
      if (docSnap.exists()) {
        if (!this.arrayOfFirendsWithChat.some((friend) => friend.uid == docSnap.data()["uid"])) { //user is not already in array
          user = docSnap.data()
          user['id'] = obj.id; // save id of doc of chat with the user in the user object to read out the information later, when the chat window will be opened by click on the users box
          this.arrayOfFirendsWithChat.push(user)
        }
        if (this.arrayOfFriendsWithChatUid.length == this.arrayOfFirendsWithChat.length) this.showChatsWithFriends = true;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    console.log (this.arrayOfFirendsWithChat)
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
        id: ''
      });
      this.updateIdInFirestorePostsDocs(docRef.id)
      this.currentChatId = docRef.id;
      this.arrayOfFriendsWithChatUid.push(friendUid);
    }
    else {
      console.log('already doc exist');
      this.findFriendInList(friendUid);
    }
  }

  findFriendInList(friendUid) {
    let friend = this.arrayOfFirendsWithChat.find((friend) => friend.uid == friendUid);
    this.navigateToChatWithFriend(friend.id);
  }

  //give the id of document in the document as a field
  async updateIdInFirestorePostsDocs(id) {
    let docRef = doc(this.db, "posts", id);
    await updateDoc(docRef, {
      id: id
    })
  }

  friendChatDocAlreadyExist(friendUid) {
    if (this.arrayOfFriendsWithChatUid.indexOf(friendUid) > -1) return true;
    else return false;
  }


  navigateToChatWithFriend(friendChatId) {
    this.currentChatId = friendChatId; //Save the active doc id to read out this in the chat window
    console.log(this.currentChatId)
    this.router.navigate(['/chat-friend']);
  }
}
