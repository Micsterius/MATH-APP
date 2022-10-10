import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  areaOfNumbersForArithmetic:string = '2';
  numberOfAnswersToSolveCorrect: string = '10';
  showPicturesForAmount: string = 'yes'; //boolean not possible because there are three options
  mathOperator: string = 'plus';


  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('areaOfNumbersForArithmetic', this.areaOfNumbersForArithmetic)
    localStorage.setItem('numberOfAnswersToSolveCorrect', this.numberOfAnswersToSolveCorrect)
    localStorage.setItem('areaOfNumbersForArithmetic', this.showPicturesForAmount)
    localStorage.setItem('areaOfNumbersForArithmetic', this.mathOperator)
  }

  ngOnChanges() {
    
  }

  getOperator(operator) {
    this.mathOperator = operator;
    localStorage.setItem('areaOfNumbersForArithmetic', this.mathOperator)
  }

  getAreaOfNumbersForArithmetic(a) {
    this.areaOfNumbersForArithmetic = a;
    localStorage.setItem('areaOfNumbersForArithmetic', this.areaOfNumbersForArithmetic)
  }

  getNumberOfAnswersToSolveCorrect(number) {
    this.numberOfAnswersToSolveCorrect = number;
    localStorage.setItem('numberOfAnswersToSolveCorrect', this.numberOfAnswersToSolveCorrect)
  }

  getShowPicturesForAmount(param) {
    this.showPicturesForAmount = param;
    localStorage.setItem('areaOfNumbersForArithmetic', this.showPicturesForAmount)
  }
}
