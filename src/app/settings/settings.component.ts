import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  areaOfNumbersForArithmetic: number[] = [2, 7]
  numberOfAnswersToSolveCorrect: number = 10;
  showPicturesForAmount: string = 'yes'; //boolean not possible because there are three options
  mathOperator: string = 'plus';


  constructor() { }

  ngOnInit(): void {
  }

  getOperator(operator) {
    this.mathOperator = operator;
  }

  getAreaOfNumbersForArithmetic(a, b) {
    this.areaOfNumbersForArithmetic = [a, b];
  }

  getNumberOfAnswersToSolveCorrect(number) {
    this.numberOfAnswersToSolveCorrect = number;
  }

  getShowPicturesForAmount(param) {
    this.showPicturesForAmount = param;
  }
}
