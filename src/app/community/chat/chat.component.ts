import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
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
    console.log (this.allChats)
    this.allChats.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

  }
}
