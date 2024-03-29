import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MathService } from 'src/app/shared/services/math.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mental-arithmetic',
  templateUrl: './mental-arithmetic.component.html',
  styleUrls: ['./mental-arithmetic.component.scss']
})
export class MentalArithmeticComponent implements OnInit {


  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: User;

  numberOne: number = 0;
  numberTwo: number = 0;
  setting: any;
  params: any = '';
  numberOfAnswersToSolveCorrect: number = 10;
  showBothPictures: boolean = false;
  showOnePictures: boolean = false;
  operator: string = '+';

  min: number = 2;
  max: number = 7;
  result: number;
  temporaryOperatorChoice: string;

  wrongAnswers: any[] = [];

  currentQuestion: number = 0;
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
    public mathServ: MathService,
    public speakServ: SpeakingService,
    private trophyService: TrophyService,
    private authService: AuthenticationService) {
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    this.loadSettingsFromLocalStorage()
    this.setStartValues()
    this.newArithmetic();
  }


  ngOnInit(): void {
  }

  //these values will be set to start
  setStartValues() {
    this.wrongAnswers.length = 0;
    this.mathServ.numberOfMathProblems = 1;
    this.mathServ.numberOfRightAnswers = 0;
  }

  //If settings are saved in local storage it will be get here
  loadSettingsFromLocalStorage() {
    this.setting = JSON.parse(localStorage.getItem('setting'))
    if (!this.setting) this.setStandardSetting();
    this.temporaryOperatorChoice = this.setting.mathOperator
    if (this.temporaryOperatorChoice == 'both') this.setting.mathOperator = 'plus';
    this.showPictures();
    this.findAreaOfNumbers(this.setting.areaOfNumbersForArithmetic);
    this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
  }

  helptext() {
    if (this.helpSpeakPictures()) {
      let text = 'Wenn du auf die bunten Kugeln tippst, verändert sich ihre Farbe. Das hilft dir beim Zählen'
      this.speakServ.speak(text, 1)
    }
  }

  //the helptext is only usefull, if the images of amount are active
  helpSpeakPictures() {
    return (this.setting.showPicturesForAmount == 'yes' || this.setting.showPicturesForAmount == 'partly')
  }

  setStandardSetting() {
    this.setting = {
      'mathOperator': 'plus',
      'showPicturesForAmount': 'yes',
      'numberOfAnswersToSolveCorrect': '10',
      'areaOfNumbersForArithmetic': 'small'
    }
  }

  showPictures() {
    if (this.setting.showPicturesForAmount == 'yes') this.showBothPictures = true;
    if (this.setting.showPicturesForAmount == 'partly') this.showOnePictures = true;
    if (this.setting.showPicturesForAmount == 'no') {
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
    if (this.setting.mathOperator == 'minus') this.operator = '-';
    if (this.setting.mathOperator == 'plus') this.operator = '+';
  }

  generateRandomIntegers() {
    let x = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max
    let y = Math.floor((Math.random() * (this.max + 1 - this.min)) + this.min); // random Number between min and max

    this.arrangeNumbersOnPosition(x, y)
    this.calcRightAnswer(x, y);
  }

  arrangeNumbersOnPosition(x, y) {
    if (this.minusOperationIsGiven()) {
      this.arrangeNumberForMinusOperation(x, y)
    }
    else {
      this.numberOne = x;
      this.numberTwo = y;
    }
    this.mathServ.fillArrayOfImageAmount(this.numberOne, this.numberTwo, this.setting.mathOperator)
  }

  arrangeNumberForMinusOperation(x, y) {
    if (x >= y) {
      this.numberOne = x;
      this.numberTwo = y;
    }
    else {
      this.numberOne = y;
      this.numberTwo = x;
    }
  }

  //If both operation is selected, it has to be looked for if plus or minus was the last operator
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
    return this.setting.mathOperator = 'minus'; //workingOperator = -1
  }

  doPlusOperation() {
    return this.setting.mathOperator = 'plus'; //workingOperator = +1
  }

  plusOperationIsGiven() {
    return this.setting.mathOperator == 'plus'; //workingOperator = +1
  }

  minusOperationIsGiven() {
    return this.setting.mathOperator == 'minus'; //workingOperator = +1
  }

  calcRightAnswer(x, y) {
    if (this.minusOperationIsGiven()) this.arrangeForMinusOperation(x, y)
    else {
      this.mathServ.result = x + y;
      this.mathServ.generateRandomizedAnswers();
    }
  }

  arrangeForMinusOperation(x, y) {
    if (x >= y) this.mathServ.result = x - y;
    else this.mathServ.result = y - x;
    this.mathServ.generateRandomizedAnswers();
  }

  checkAnswer(selection) {
    this.answerIsGiven = true;
    if (this.rightAnswerIsClicked(selection)) {
      this.mathServ.playSound('success');
      this.mathServ.numberOfRightAnswers++;
      this.updateProgressbar();
      setTimeout(() => this.showEndscreen(), 500)
    }
    else {
      this.mathServ.playSound('wrong')
      this.pushMathProblemInWrongAnswersArray()
    }
  }

  rightAnswerIsClicked(selection) {
    return selection == this.mathServ.result
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
    this.progressBarValue = this.mathServ.numberOfRightAnswers * 100 / this.numberOfAnswersToSolveCorrect
  }

  nextMathProblem() {
    this.mathServ.numberOfMathProblems++;
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
    if (this.mathServ.numberOfRightAnswers == this.numberOfAnswersToSolveCorrect) {
      this.mathServ.wrongAnswers = this.wrongAnswers;
      if (this.authService.additionUserDataExist()) this.earnTrophy(); // guests don't get trophys because guests don't have additionUserData
      else {
        let infoText = 'Bitte registriere dich, um für deine Leistung Münzen zu erhalten.'
        this.speakServ.speak(infoText, 1)
      }
      this.router.navigate(['/arithmeticEndscreen']);
    }
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.wrongAnswers.length < 1) this.trophyService.giveMedal('bronze', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 10 && this.wrongAnswers.length < 2) this.trophyService.giveMedal('silver', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 20 && this.wrongAnswers.length < 2) this.trophyService.giveMedal('gold', this.actualUser.uid)
  }
}

