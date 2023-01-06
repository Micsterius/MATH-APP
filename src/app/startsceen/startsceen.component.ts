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
  activeUser;
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
    this.activeUser = JSON.parse(localStorage.getItem('user')!);
    this.sayHello()
    this.sayHelloToGuest()
  }

  ngOnInit(): void {
  }

  saveCurrentExercise(exercise) {
    this.generalService.currentExercise = exercise
    this.generalService.inExercise = true;
  }

  async sayHello() {
    if (this.authService.sayHelloToUser && await this.authService.additionUserDataExist()) {
      let text
      if (this.activeUser.displayName != 'User') {
        text = `Hallo ${this.activeUser.displayName}`
      }
      else {
        text = `Hallo lieber Nutzer, ändere deinen Namen, damit ich dich persönlich begrüßen kann`
        this.generalService.highlightSettingsButton = true;
        setTimeout(() => {
          this.generalService.highlightSettingsButton = false;
        }, 8000);
      }
      this.authService.sayHelloToUser = false;
      this.speakServ.speak(text, 0.8)
    }
  }

  sayHelloToGuest() {
    if (this.authService.sayHelloToGuest) {
      let text = `Hallo lieber Gast, viel Spaß beim Erkunden`
      this.authService.sayHelloToGuest = false;
      this.speakServ.speak(text, 0.8)
    }
  }

}
