import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  areaOfNumbersForArithmetic: string = '2';
  numberOfAnswersToSolveCorrect: string = '10';
  showPicturesForAmount: string = 'yes'; //boolean not possible because there are three options
  mathOperator: string = 'plus';
  mathSetting = {
    'mathOperator': this.mathOperator,
    'showPicturesForAmount': this.showPicturesForAmount,
    'numberOfAnswersToSolveCorrect': this.numberOfAnswersToSolveCorrect,
    'areaOfNumbersForArithmetic': this.areaOfNumbersForArithmetic
  }

  constructor() {
    localStorage.setItem('mathSetting', JSON.stringify(this.mathSetting));
  }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }

  actualizeSettingObj() {
    this.mathSetting = {
      'mathOperator': this.mathOperator,
      'showPicturesForAmount': this.showPicturesForAmount,
      'numberOfAnswersToSolveCorrect': this.numberOfAnswersToSolveCorrect,
      'areaOfNumbersForArithmetic': this.areaOfNumbersForArithmetic
    }
    localStorage.setItem('mathSetting', JSON.stringify(this.mathSetting));
  }

  getOperator(operator) {
    this.mathOperator = operator;
    this.actualizeSettingObj();
  }

  getAreaOfNumbersForArithmetic(a) {
    this.areaOfNumbersForArithmetic = a;
    this.actualizeSettingObj();
  }

  getNumberOfAnswersToSolveCorrect(number) {
    this.numberOfAnswersToSolveCorrect = number;
    this.actualizeSettingObj();
  }

  getShowPicturesForAmount(param) {
    this.showPicturesForAmount = param;
    this.actualizeSettingObj();
  }
}
