import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-friend',
  templateUrl: './chat-friend.component.html',
  styleUrls: ['./chat-friend.component.scss']
})
export class ChatFriendComponent implements OnInit {

currentChatId;

  constructor(
    public chatServ: ChatService,
    public afs: AngularFirestore
  ) {
    this.currentChatId = this.chatServ.currentChatId
    this.loadChat();
   }

  ngOnInit(): void {
  }

  loadChat(){
    console.log(this.currentChatId)
    this.afs.collection('posts')
      .doc(this.currentChatId)
      .collection('text')
      .valueChanges()
      .subscribe((text) => {
        let allPosts = text;
        console.log('POSTS IS', allPosts)
      })
/*
      this.afs.collection('posts')
      .doc('RKXScwaXiEma9EeoMEwh')
      .collection('text')
      .valueChanges()
      .subscribe((text) => {
        let allPosts = text;
        console.log('POSTS IS', allPosts)
      })*/
  }
}
