import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Arithmetic } from 'src/models/arithmetic';

@Component({
  selector: 'app-arithmetic-area',
  templateUrl: './arithmetic-area.component.html',
  styleUrls: ['./arithmetic-area.component.scss']
})
export class ArithmeticAreaComponent implements OnInit {

  Arr = Array

  arithmetic: Arithmetic | any;
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
  resultsX: any[] = [];
  resultsY: any[] = [];
  results: any[] = [];
  wrongAnswersX: any[] = [];
  wrongAnswersY: any[] = [];
  wrongAnswerOperators: any[] = [];
  wrongAnswersResults: any[] = [];
  temporaryOperatorChoice: string;

  currentQuestion: number = 0;
  numberOfRightAnswers: number = 0;

  numberOfMathProblems: number = 1;

  chosenOperator: number = 1;
  workingOperator: number = 1;

  result1: number = 0;
  result2: number = 0;
  result3: number = 0;
  result4: number = 0;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  showArithmeticEndscreen: boolean = false;

  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(private router: Router) {
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

  fillArrayOfImageAmount() {
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
  }

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
    this.fillArrayOfImageAmount()
  }

  changeOperator() {
    console.log('nn')
    if (this.temporaryOperatorChoice == 'both') {
      if (this.plusOperationIsGiven()) {
        this.operator = '-';
        this.doMinusOperation();
        console.log('A')
      }
      else {
        this.operator = '+';
        this.doPlusOperation();
        console.log('B')
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
        this.pushCalcInTemporaryArray(result, x, y);
        this.generateRandomizedAnswers();
      }
      else {
        let result = y - x;
        this.pushCalcInTemporaryArray(result, x, y);
        this.generateRandomizedAnswers();
      }
    }
    else {
      let result = x + y;
      this.pushCalcInTemporaryArray(result, x, y);
      this.generateRandomizedAnswers();
    }
  }



  pushCalcInTemporaryArray(result, x, y) {
    this.resultsX.push(x)
    this.resultsY.push(y)
    this.results.push(result)
  }

  generateRandomizedAnswers() {
    let result = this.results[0]
    let x = Math.floor(Math.random() * 4 + 1); // generate a randomize number between 1 and 4
    if (x == 1) this.showAnswers1(result)
    if (x == 2) this.showAnswers2(result)
    if (x == 3) this.showAnswers3(result)
    if (x == 4) this.showAnswers4(result)
  }

  showAnswers1(result) {
    this.result1 = result;
    this.result2 = result + 1;
    if (result < 1) this.result3 = result + 3;//make sure there is no negative number in the result options
    else this.result3 = result - 1;
    this.result4 = result + 2;
  }

  showAnswers2(result) {
    if (result < 2) this.result1 = result + 3; //make sure there is no negative number in the result options
    else this.result1 = result - 2;
    this.result2 = result;
    if (result < 1) this.result3 = result + 2;//make sure there is no negative number in the result options
    else this.result3 = result - 1;
    this.result4 = result + 1;
  }

  showAnswers3(result) {
    this.result1 = result + 2;
    this.result2 = result + 3;
    this.result3 = result;
    if (result < 1) this.result4 = result + 1;//make sure there is no negative number in the result options
    else this.result4 = result - 1;
  }

  showAnswers4(result) {
    if (result < 1) this.result1 = result + 2;//make sure there is no negative number in the result options
    else this.result1 = result - 1;
    this.result2 = result + 4;
    if (result < 2) this.result3 = result + 1; //make sure there is no negative number in the result options
    else this.result3 = result - 2;
    this.result4 = result;
  }

  checkAnswer(selection) {
    let x = this.resultsX[0];
    let y = this.resultsY[0];
    let rightAnswer = this.results[0];
    this.answerIsGiven = true;

    if (selection == rightAnswer) {
      this.playSound('success');
      this.numberOfRightAnswers++;
      this.updateProgressbar();

      setTimeout(() => {
        this.showEndscreen();
      }, 500);
    }
    else {
      this.playSound('wrong')
      /* 
       this.pushMathProblemInWrongAnswersArray(x, y, workingOperator)*/
    };
  }

  updateProgressbar() {
    this.progressBarValue = this.numberOfRightAnswers * 100 / this.numberOfAnswersToSolveCorrect
  }

  playSound(event) {
    let AUDIO_RESULT = new Audio()
    AUDIO_RESULT.src = "./../../assets/audio/" + event + ".mp3"
    AUDIO_RESULT.load();
    AUDIO_RESULT.play();
  }

  checkResult(selection) {
    if (selection == this.results[0]) return true;
    else return false;
  }

  toggleClass = (event) => {
    event.target.classList.add('btn-pressed');
  }

  nextMathProblem() {
    this.numberOfMathProblems++;
    this.answerIsGiven = false;
    this.resetAnswerButtons();
    this.changeOperator(); //if in settings is chosen both for operators, the next math problem switch from minus to plus and reverse
    this.clearTemporaryArray();
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

  clearTemporaryArray() {
    this.resultsX.splice(0, 1);
    this.resultsY.splice(0, 1);
    this.results.splice(0, 1);
  }

  showEndscreen() {
    if (this.numberOfRightAnswers == this.numberOfAnswersToSolveCorrect) this.router.navigate(['/arithmeticEndscreen']);
  }
}
