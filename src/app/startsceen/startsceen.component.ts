import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Keyboard, Virtual } from "swiper";
import { AuthenticationService } from '../shared/services/authentication.service';
import { GeneralService } from '../shared/services/general.service';
import { SpeakingService } from '../shared/services/speaking.service';
import { UserInfoService } from '../shared/services/user-info.service';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-startsceen',
  templateUrl: './startsceen.component.html',
  styleUrls: ['./startsceen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartsceenComponent implements OnInit {
  showStartScreen: boolean = false;
  buttons: any[] = [
    {
      'nameOne': 'Kopfrechnen',
      'linkOne': 'arithmetic',
    },
    {
      'nameOne': 'Silben lesen',
      'linkOne': 'reading-phenomene',
    },
    {
      'nameOne': 'Wörter lesen',
      'linkOne': 'reading-words',
    },
    {
      'nameOne': 'Wörter schreiben',
      'linkOne': 'writing-words',
    }
  ]

  constructor(
    public speakServ: SpeakingService,
    public usersService: UserInfoService,
    public authService: AuthenticationService,
    private generalService: GeneralService
  ) {
    this.usersService.loadUsers();

    let setting = JSON.parse(localStorage.getItem('setting'));
    if (setting) {
      this.speakServ.voiceName = setting.voice
    }



      this.sayHello();
      this.sayHelloToGuest();
      this.generalService.inExercise = false;
      this.loadSpeakVoices()
    }

    ngOnInit(): void {
    }

  async loadSpeakVoices() {
      await this.speakServ.loadAllVoices();
    }

    saveCurrentExercise(exercise) {
      this.generalService.currentExercise = exercise
      this.generalService.inExercise = true;
    }

  async sayHello() {
      if (this.authService.sayHelloToUser && await this.authService.additionUserDataExist()) {
        let text
        if (this.authService.userData.displayName != 'User') {
          text = `Hallo ${this.authService.userData.displayName}, drück auf mich in den Übungen, wenn du Hilfe brauchst`
        }
        else {
          text = `Hallo lieber Nutzer, ändere deinen Namen, damit ich dich persönlich begrüßen kann. Drück auf mich in den Übungen, wenn du Hilfe brauchst`
          this.generalService.highlightSettingsButton = true;
          setTimeout(() => {
            this.generalService.highlightSettingsButton = false;
          }, 8000);
        }
        setTimeout(() => {
          this.authService.sayHelloToUser = false;
        }, 8000);
        this.speakServ.speak(text, 0.8)
      }
    }

    sayHelloToGuest() {
      if (this.authService.sayHelloToGuest) {
        let text = `Hallo lieber Gast, viel Spaß beim Erkunden. Drück auf mich in den Übungen, wenn du Hilfe brauchst`
        setTimeout(() => {
          this.authService.sayHelloToGuest = false;
        }, 9000);
        this.speakServ.speak(text, 0.8)
      }
    }

  }
