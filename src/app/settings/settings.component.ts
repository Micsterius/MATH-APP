import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MathService } from '../shared/services/math.service';
import { SpeakingService } from '../shared/services/speaking.service';

import SwiperCore, { Pagination, Navigation, Keyboard, Virtual } from "swiper";
import { GeneralService } from '../shared/services/general.service';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  areaOfNumbersForArithmetic: string = 'middle';
  numberOfAnswersToSolveCorrect: string = '10';
  showPicturesForAmount: string = 'yes'; //boolean not possible because there are three options
  mathOperator: string = 'plus';

  setting = {
    'mathOperator': 'plus',
    'showPicturesForAmount': 'yes',
    'numberOfAnswersToSolveCorrect': '10',
    'areaOfNumbersForArithmetic': 'middle',
    'rangeValueVolume': '100',
    'rangeValueRate': '50',
    'voice': `1`
  }

  areas: any[] = [1, 2]

  disableBtnAmount: boolean = false;
  allowToSlide: boolean = true;
  rangeValueVolume: number = 100;
  rangeValueRate: number = 50;
  voice: string = '';


  constructor(
    public speakServ: SpeakingService,
    public mathServ: MathService,
    private generalService: GeneralService
  ) {
    this.loadSetting();
    this.generalService.inExercise = false;
  }

  ngOnInit(): void {
  }

  loadSetting() {
    let setting = JSON.parse(localStorage.getItem('setting'));
    if (setting) {
      this.areaOfNumbersForArithmetic = setting.areaOfNumbersForArithmetic;
      this.numberOfAnswersToSolveCorrect = setting.numberOfAnswersToSolveCorrect
      this.mathOperator = setting.mathOperator
      this.showPicturesForAmount = setting.showPicturesForAmount
      this.rangeValueVolume = Number(setting.rangeValueVolume)
      this.rangeValueRate = Number(setting.rangeValueRate)
      this.voice = setting.voice
      if (this.setting.areaOfNumbersForArithmetic == 'high') this.disableBtnAmount = true;
    }
  }

  getRangeVolume() {
    this.actualizeSettingObj()
    this.playSound(this.rangeValueVolume)
  }

  getRangeRate() {
    this.actualizeSettingObj();
    this.speakServ.speak('Willkommen', this.rangeValueRate / 100)
  }

  selectVoice(name) {
    this.voice = name
    this.speakServ.changeVoice(name)
    this.speakServ.speakSettings('Hallo', 1)
    this.actualizeSettingObj();
    this.speakServ.selection = name;
  }

  infoSpeech() {
    let text = 'Leider stellt dein Browser nur eine deutsche Stimme zur Verfügung. Wenn du eine andere Stimme willst, öffne die App mit dem Browser Microsoft Edge'
    this.speakServ.speakSettingsInfo(text, 0.9)
  }

  playSound(nbr) {
    this.speakServ.volume = nbr;
    this.mathServ.volume = nbr;
    this.speakServ.speak('Hallo', 1)
    setTimeout(() => {
      this.mathServ.playSound('success')
    }, 1000)
  }



  actualizeSettingObj() {
    this.setting = {
      'mathOperator': this.mathOperator,
      'showPicturesForAmount': this.showPicturesForAmount,
      'numberOfAnswersToSolveCorrect': this.numberOfAnswersToSolveCorrect,
      'areaOfNumbersForArithmetic': this.areaOfNumbersForArithmetic,
      'rangeValueVolume': `${this.rangeValueVolume}`,
      'rangeValueRate': `${this.rangeValueRate}`,
      'voice': `${this.voice}`
    }
    localStorage.setItem('setting', JSON.stringify(this.setting));
  }

  getOperator(operator) {
    this.mathOperator = operator;
    this.actualizeSettingObj();
  }

  getAreaOfNumbersForArithmetic(a) {
    this.areaOfNumbersForArithmetic = a;
    if (a == 'high') {
      this.getShowPicturesForAmount('no'); //in case of number bigger than 15, no helping images will be shown.
      this.disableBtnAmount = true;
      this.giveHint();
    }
    else this.disableBtnAmount = false;
    this.actualizeSettingObj();
  }

  getNumberOfAnswersToSolveCorrect(number) {
    this.numberOfAnswersToSolveCorrect = number;
    this.actualizeSettingObj();
  }

  getShowPicturesForAmount(param) {
    this.showPicturesForAmount = param;
    if (this.setting.areaOfNumbersForArithmetic == 'high') this.showPicturesForAmount = 'no';
    this.actualizeSettingObj();
  }

  giveHint() {
    let text = 'Bitte beachte, im Zahlenbereich von 10 bis 20 werden keine Bilder der Zahlenmenge dargestellt.'
    this.speakServ.speak(text, 1)
  }
}
