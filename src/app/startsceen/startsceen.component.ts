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
      'icon': 'calculate'
    },
    {
      'nameOne': 'Silben lesen',
      'linkOne': 'reading-phenomene',
      'icon': 'local_library'
    },
    {
      'nameOne': 'Wörter lesen',
      'linkOne': 'reading-words',
      'icon': 'local_library'
    },
    {
      'nameOne': 'Wörter schreiben',
      'linkOne': 'writing-words',
      'icon': 'edit'
    }
  ]

  constructor(
    public speakServ: SpeakingService,
    public usersService: UserInfoService,
    public authService: AuthenticationService,
    private generalService: GeneralService
  ) {
    this.usersService.loadUsers();
    this.loadVoiceFromSetting()
    this.generalService.inExercise = false;
    this.loadSpeakVoices()
  }

  ngOnInit(): void {
  }

  loadVoiceFromSetting() {
    let setting = JSON.parse(localStorage.getItem('setting'));
    if (setting) {
      this.speakServ.voiceName = setting.voice
    }
  }

  async loadSpeakVoices() {
    await this.speakServ.loadAllVoices();
  }

  saveCurrentExercise(exercise) {
    this.generalService.currentExercise = exercise
    this.generalService.inExercise = true;
  }
}
