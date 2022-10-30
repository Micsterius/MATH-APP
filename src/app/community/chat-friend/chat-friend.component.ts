import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
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
    let querySnapshot = await getDocs(collection(this.db, "posts", this.currentChatId, "texts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      //this.testArray.push(doc.data())
      this.messages.push(doc.data())
    });
    this.userFriend = this.chatServ.arrayOfFirendsWithChat.find((friend) => friend.uid == this.chatServ.currentFriendId)
    this.showChat = true;
  }

  async sendMessage(){
    await setDoc(doc(this.db, "posts", this.currentChatId, "texts", "text-"+(this.messages.length+1)), {content: this.message, author: this.currentUser.uid})
    let newMessage = {author: this.currentUser.uid, content: this.message}
    this.messages.push(newMessage)
    console.log(this.message)
  }
}
