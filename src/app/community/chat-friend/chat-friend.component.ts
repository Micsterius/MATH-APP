import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-friend',
  templateUrl: './chat-friend.component.html',
  styleUrls: ['./chat-friend.component.scss']
})
export class ChatFriendComponent implements OnInit {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  currentChatId;
  messages: any[] = [];
  showChat: boolean = false;
  userFriend: User;
  currentUser: User;
  message: any;

  constructor(
    public chatServ: ChatService,
    public authServ: AuthService,
  ) {
    this.currentUser = this.authServ.userData;
    this.currentChatId = this.chatServ.currentChatId;
    this.loadChat();
  }

  ngOnInit(): void {
  }

  async loadChat() {
    let q = query(collection(this.db, "posts", this.currentChatId, "texts"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.messages = [];
      this.showChat = false;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //this.testArray.push(doc.data())
        this.messages.push(doc.data())
      })
      this.showChat = true;
    });
    this.userFriend = this.chatServ.arrayOfFirendsWithChat.find((friend) => friend.uid == this.chatServ.currentFriendId)
    this.showChat = true;
  }

  /**here the new doc id in the subcollection texts will be generated with two components. 
   * The first one is a timestamp, so the messeages are in the right order when they come 
   * from firestore. The second component is a randowm string with 6 characters if two 
   * users post at the same time. */
  async sendMessage() {
    let textId = Math.round(new Date().getTime() / 1000);
    let idAdd = Math.random().toString(16).substr(2, 6)
    await setDoc(doc(this.db, "posts", this.currentChatId, "texts", `${textId + idAdd}`), { content: this.message, author: this.currentUser.uid })
    this.message = '';
  }
}
