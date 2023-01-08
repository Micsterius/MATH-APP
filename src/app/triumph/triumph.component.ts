import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';
import { SpeakingService } from '../shared/services/speaking.service';

@Component({
  selector: 'app-triumph',
  templateUrl: './triumph.component.html',
  styleUrls: ['./triumph.component.scss']
})
export class TriumphComponent implements OnInit {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  actualUser: User;
  userInfos: any;
  showTrophys: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private speakService: SpeakingService
  ) {
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    this.getMedals();
    this.giveHint();
  }

  ngOnInit(): void {
  }

  async giveHint() {
    if (this.authService.userData != undefined) this.giveHintIfUserIsAGuest()
    else setTimeout(() => this.giveHintIfUserIsAGuest(), 1000);
  }

  async giveHintIfUserIsAGuest() {
    if (!await this.authService.additionUserDataExist()) {
      let infoText = 'Bitte registriere dich, um für deine Leistung Münzen zu erhalten.'
      this.speakService.speak(infoText, 1)
    }
  }

  async getMedals() {

    let docRef = doc(this.db, "more-user-infos", this.actualUser.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.userInfos = docSnap.data();
      this.showTrophys = true;
    }
    else console.log("No such document");
  }

  explainBronzeCoin() {
    let text = 'Verdiene dir eine Bronze Münze in dem du in Einstellung auf 5 Aufgaben richtig ausfüllen klickst und in der Übung keine Fehler machst.'
    this.speakService.speak(text, 1)
  }

  explainSilverCoin() {
    let text = 'Verdiene dir eine Silber Münze in dem du in Einstellung auf 10 Aufgaben richtig ausfüllen klickst und in der Übung höchstens einen Fehler machst.'
    this.speakService.speak(text, 1)
  }

  explainGoldCoin() {
    let text = 'Verdiene dir eine Gold Münze in dem du in Einstellung auf 20 Aufgaben richtig ausfüllen klickst und in der Übung höchstens einen Fehler machst.'
    this.speakService.speak(text, 1)
  }
}
