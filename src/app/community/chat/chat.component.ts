import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ChatService } from 'src/app/shared/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  constructor(
    public chatServ: ChatService,
    private router: Router) {
    chatServ.loadChats()
  }

  ngOnInit(): void {
  }

  saveCurrentFriendId(friend) {
    localStorage.setItem('userFriend', JSON.stringify(friend));
  }

  navigateToMain() {
    this.router.navigate(['/main-community'])
  }
}
