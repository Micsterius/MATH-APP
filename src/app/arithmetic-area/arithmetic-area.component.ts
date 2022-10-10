import { Component, OnInit } from '@angular/core';
import { Arithmetic } from 'src/models/arithmetic';

@Component({
  selector: 'app-arithmetic-area',
  templateUrl: './arithmetic-area.component.html',
  styleUrls: ['./arithmetic-area.component.scss']
})
export class ArithmeticAreaComponent implements OnInit {
  arithmetic: Arithmetic | any;
  numberOne: number = 0;
  numberTwo: number = 0;

  params: any = '';
  areaOfNumbersForArithmetic
  numberOfAnswersToSolveCorrect: number = 10;
  showPicturesForAmount
  mathOperator: string = 'plus';

  min: number = 2;
  max: number = 7;
  showImages: number = 2;

  constructor() { }

  ngOnInit(): void {
    let areaOfNumbersForArithmetic = localStorage.getItem('areaOfNumbersForArithmetic')
    let numberOfAnswersToSolveCorrect = localStorage.getItem('numberOfAnswersToSolveCorrect')
    let showPicturesForAmount = localStorage.getItem('areaOfNumbersForArithmetic')
    this.mathOperator = localStorage.getItem('areaOfNumbersForArithmetic')

    this.findAreaOfNumbers(areaOfNumbersForArithmetic)
    this.findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect)
    this.findShowPicturesForAmount(showPicturesForAmount)
    this.newArithmetic()
  }

  findShowPicturesForAmount(showPicturesForAmount) {
    if (showPicturesForAmount == 'yes') this.showPicturesForAmount = 2;
    if (showPicturesForAmount == 'partly') this.showPicturesForAmount = 1;
    if (showPicturesForAmount == 'no') this.showPicturesForAmount = 0;
  }

  findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect) {
    if (numberOfAnswersToSolveCorrect == '5') this.numberOfAnswersToSolveCorrect = 5;
    if (numberOfAnswersToSolveCorrect == '10') this.numberOfAnswersToSolveCorrect = 10;
    if (numberOfAnswersToSolveCorrect == '20') this.numberOfAnswersToSolveCorrect = 20;
  }

  findAreaOfNumbers(areaOfNumbersForArithmetic) {
    if (areaOfNumbersForArithmetic == 'small') {
      this.min = 2;
      this.max = 7;
    }
    if (areaOfNumbersForArithmetic == 'middle') {
      this.min = 5;
      this.max = 15;
    }
    if (areaOfNumbersForArithmetic == 'high') {
      this.min = 10;
      this.max = 20;
    }
  }

  newArithmetic() {
    this.generateRandomIntegers();
    this.changeOperatorInHTML();
    this.renderStatisticOverview();
  }

  generateRandomIntegers() {
    let x = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max
    let y = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max

    this.arrangeNumbersOnPosition(x, y)
    this.calcRightAnswer(x, y);
    this.renderImageOfAmount();
  }

  arrangeNumbersOnPosition(x, y) {
    if (this.mathOperator == 'minus') {
      if (x >= y) {
        this.numberOne = x;
        this.numberTwo = y;
      }
      else {
        this.numberOne = y;
        this.numberTwo = x;
      }
    }
    else {
      this.numberOne = x;
      this.numberTwo = y;
    }
  }

  changeOperatorInHTML(){
    //
  }

  renderStatisticOverview() {
    //
  }

  calcRightAnswer(x, y) {
    //
  }

  renderImageOfAmount() {
    //
  }

}
