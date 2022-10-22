import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from '../shared/services/math.service';

@Component({
  selector: 'app-arithmetic-area',
  templateUrl: './arithmetic-area.component.html',
  styleUrls: ['./arithmetic-area.component.scss']
})
export class ArithmeticAreaComponent implements OnInit {

  numberOne: number = 0;
  numberTwo: number = 0;
  mathSetting: any;
  params: any = '';
  areaOfNumbersForArithmetic
  numberOfAnswersToSolveCorrect: number = 10;
  showPicturesForAmount
  showBothPictures: boolean = false;
  showOnePictures: boolean = false;
  operator: string = '+';
  imageArrayNumberOne: string[] = [];
  imageArrayNumberTwo: string[] = [];

  min: number = 2;
  max: number = 7;
  showImages: number = 2;
  result: number;
  temporaryOperatorChoice: string;

  wrongAnswers: any[] = [];

  currentQuestion: number = 0;
  numberOfRightAnswers: number = 0;

  numberOfMathProblems: number = 1;

  chosenOperator: number = 1;
  workingOperator: number = 1;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  showArithmeticEndscreen: boolean = false;

  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(
    private router: Router,
    public mathServ: MathService) {
    this.wrongAnswers.length = 0;
    this.mathSetting = JSON.parse(localStorage.getItem('mathSetting'))
    this.temporaryOperatorChoice = this.mathSetting.mathOperator
    if (this.temporaryOperatorChoice == 'both') this.mathSetting.mathOperator = 'plus';
    this.showPictures();
    console.log(this.mathSetting)
    this.findAreaOfNumbers(this.mathSetting.areaOfNumbersForArithmetic);
    this.findNumberOfAnswersToSolveCorrect(this.mathSetting.numberOfAnswersToSolveCorrect);
    this.newArithmetic();
  }

  ngOnInit(): void {
  }

 /* fillArrayOfImageAmount() {
    this.imageArrayNumberOne.length = 0;
    this.imageArrayNumberTwo.length = 0;
    for (let i = 0; i < this.numberOne; i++) this.imageArrayNumberOne.push('nbr-1.svg');
    if (this.mathSetting.mathOperator == 'plus') for (let i = 0; i < this.numberTwo; i++) this.imageArrayNumberTwo.push('nbr-1.svg');
    if (this.mathSetting.mathOperator == 'minus') for (let i = 0; i < this.numberTwo; i++) this.imageArrayNumberTwo.push('nbr-1-red.svg');
  }

  //x is number one or two, imageNumber is index in Array
  changeImageColor(imageNumber, x) {
    if (x == 1) {
      if (this.imageArrayNumberOne[imageNumber] == 'nbr-1.svg') this.imageArrayNumberOne[imageNumber] = 'nbr-1-red.svg';
      else this.imageArrayNumberOne[imageNumber] = 'nbr-1.svg';
    }
    if (x == 2) {
      if (this.imageArrayNumberTwo[imageNumber] == 'nbr-1.svg') this.imageArrayNumberTwo[imageNumber] = 'nbr-1-red.svg';
      else this.imageArrayNumberTwo[imageNumber] = 'nbr-1.svg';
    }
  }*/

  showPictures() {
    if (this.mathSetting.showPicturesForAmount == 'yes') this.showBothPictures = true;
    if (this.mathSetting.showPicturesForAmount == 'partly') this.showOnePictures = true;
    if (this.mathSetting.showPicturesForAmount == 'no') {
      this.showOnePictures = false;
      this.showBothPictures = false;
    }
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
  }

  changeOperatorInHTML() {
    if (this.mathSetting.mathOperator == 'minus') this.operator = '-';
    if (this.mathSetting.mathOperator == 'plus') this.operator = '+';
  }

  generateRandomIntegers() {
    let x = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max
    let y = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max

    this.arrangeNumbersOnPosition(x, y)
    this.calcRightAnswer(x, y);
  }

  arrangeNumbersOnPosition(x, y) {
    if (this.minusOperationIsGiven()) {
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
    this.mathServ.fillArrayOfImageAmount(this.numberOne, this.numberTwo, this.mathSetting.mathOperator)
  }

  changeOperator() {
    if (this.temporaryOperatorChoice == 'both') {
      if (this.plusOperationIsGiven()) {
        this.operator = '-';
        this.doMinusOperation();
      }
      else {
        this.operator = '+';
        this.doPlusOperation();
      }
    }

  }

  doMinusOperation() {
    return this.mathSetting.mathOperator = 'minus'; //workingOperator = -1
  }


  doPlusOperation() {
    return this.mathSetting.mathOperator = 'plus'; //workingOperator = +1
  }


  plusOperationIsGiven() {
    return this.mathSetting.mathOperator == 'plus'; //workingOperator = +1
  }


  minusOperationIsGiven() {
    return this.mathSetting.mathOperator == 'minus'; //workingOperator = +1
  }

  calcRightAnswer(x, y) {
    if (this.minusOperationIsGiven()) {
      if (x >= y) {
        let result = x - y;
        this.mathServ.result = result;
        this.mathServ.generateRandomizedAnswers();
      }
      else {
        let result = y - x;
        this.mathServ.result = result;
        this.mathServ.generateRandomizedAnswers();
      }
    }
    else {
      let result = x + y;
      this.mathServ.result = result;
      this.mathServ.generateRandomizedAnswers();
    }
  }

  checkAnswer(selection) {
    let rightAnswer = this.mathServ.result;
    this.answerIsGiven = true;

    if (selection == rightAnswer) {
      this.mathServ.playSound('success');
      this.numberOfRightAnswers++;
      this.updateProgressbar();

      setTimeout(() => {
        this.showEndscreen();
      }, 500);
    }
    else {
      this.mathServ.playSound('wrong')

      this.pushMathProblemInWrongAnswersArray()
    };
  }

  pushMathProblemInWrongAnswersArray() {
    this.wrongAnswers.push({
      'numberOne': this.numberOne,
      'numberTwo': this.numberTwo,
      'operator': this.operator,
      'result': this.mathServ.result
    });
  }

  updateProgressbar() {
    this.progressBarValue = this.numberOfRightAnswers * 100 / this.numberOfAnswersToSolveCorrect
  }

  nextMathProblem() {
    this.numberOfMathProblems++;
    this.answerIsGiven = false;
    this.resetAnswerButtons();
    this.changeOperator(); //if in settings is chosen both for operators, the next math problem switch from minus to plus and reverse
    this.newArithmetic();
  }

  resetAnswerButtons() {
    if (this.answerButtonOne.nativeElement.classList.contains('btn-pressed')) {
      this.answerButtonOne.nativeElement.classList.remove('btn-pressed')
    }
    if (this.answerButtonTwo.nativeElement.classList.contains('btn-pressed')) {
      this.answerButtonTwo.nativeElement.classList.remove('btn-pressed')
    }
    if (this.answerButtonThree.nativeElement.classList.contains('btn-pressed')) {
      this.answerButtonThree.nativeElement.classList.remove('btn-pressed')
    }
    if (this.answerButtonFour.nativeElement.classList.contains('btn-pressed')) {
      this.answerButtonFour.nativeElement.classList.remove('btn-pressed')
    }
  }

  showEndscreen() {
    if (this.numberOfRightAnswers == this.numberOfAnswersToSolveCorrect) {
      this.mathServ.wrongAnswers = this.wrongAnswers;
      console.log(this.wrongAnswers)
      console.log(this.mathServ.wrongAnswers)
      this.router.navigate(['/arithmeticEndscreen']);
    }
  }
}
