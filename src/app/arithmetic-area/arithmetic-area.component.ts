import { Component, OnInit } from '@angular/core';
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

  params: any = '';
  areaOfNumbersForArithmetic
  numberOfAnswersToSolveCorrect: number = 10;
  showPicturesForAmount
  mathOperator: string = 'plus';

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

  currentQuestion: number = 0;
  numberOfRightAnswers: number = 0;

  numberOfMathProblems: number = 0;
  correctSolvedMathproblems: number = 0;

  chosenOperator: number = 1;
  workingOperator: number = 1;

  result1: number = 0;
  result2: number = 0;
  result3: number = 0;
  result4: number = 0;

  answerIsGiven: boolean = false;



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

  changeOperatorInHTML() {
    //
  }

  renderStatisticOverview() {
    //
  }

  doMinusOperation() {
    return this.workingOperator = -1; //workingOperator = -1
  }


  doPlusOperation() {
    return this.workingOperator = +1; //workingOperator = +1
  }


  plusOperationIsGiven() {
    return this.workingOperator == +1; //workingOperator = +1
  }


  minusOperationIsGiven() {
    return this.workingOperator == -1; //workingOperator = +1
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

  renderImageOfAmount() {
    //
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
      this.playSound('success')
      /*this.AUDIO_SUCCESS.play();
      this.increaseNumberOfRightSolvedMathProblems();
      this.deactivateAnswerButtons();
      this.updateProgressBar();
      setTimeout(function () {
          this.showEndscreen()
      }, 500);
      this.activateNextButton();*/
    }
    else {
      this.playSound('wrong')
      /* 
       this.AUDIO_WRONG.play();
       this.showRightAnswer(rightAnswer);
       this.pushMathProblemInWrongAnswersArray(x, y, workingOperator)
       this.activateNextButton();
       this.deactivateAnswerButtons();*/
    };
  }

  playSound(event){
    let AUDIO_RESULT = new Audio()
    AUDIO_RESULT.src = "./../../assets/audio/"+event+".mp3"
    AUDIO_RESULT.load();
    AUDIO_RESULT.play();
  }

  checkResult(selection) {
    if (selection == this.results[0]) return true;
    else return false;
  }

  toggleClass = (event) => {
    event.target.classList.toggle('btn-pressed');
  }
}
