import { Component, OnInit } from '@angular/core';
import { SpeakingService } from '../shared/services/speaking.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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
    'areaOfNumbersForArithmetic': 'middle'
  }

  areas: any[] = [1, 2]

  disableBtnAmount: boolean = false;
  allowToSlide: boolean = true;
  rangeValue: number = 50;

  constructor(
    private speakServ: SpeakingService
  ) {
    let setting = JSON.parse(localStorage.getItem('setting'));
    if (setting) {
      this.areaOfNumbersForArithmetic = setting.areaOfNumbersForArithmetic;
      this.numberOfAnswersToSolveCorrect = setting.numberOfAnswersToSolveCorrect
      this.mathOperator = setting.mathOperator
      this.showPicturesForAmount = setting.showPicturesForAmount
      if (this.setting.areaOfNumbersForArithmetic == 'high') this.disableBtnAmount = true;
    }
  }

  ngOnInit(): void {
  }

  getRange(){
    console.log(this.rangeValue)
 //   this.allowToSlide = false;
   }

  actualizeSettingObj() {
    this.setting = {
      'mathOperator': this.mathOperator,
      'showPicturesForAmount': this.showPicturesForAmount,
      'numberOfAnswersToSolveCorrect': this.numberOfAnswersToSolveCorrect,
      'areaOfNumbersForArithmetic': this.areaOfNumbersForArithmetic
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
