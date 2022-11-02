import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { MathService } from '../shared/services/math.service';

@Component({
  selector: 'app-arithmetic-area',
  templateUrl: './arithmetic-area.component.html',
  styleUrls: ['./arithmetic-area.component.scss']
})
export class ArithmeticAreaComponent implements OnInit {

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
  imageArrayNumberOne: string[] = [];
  imageArrayNumberTwo: string[] = [];

  min: number = 2;
  max: number = 7;
  showImages: number = 2;
  result: number;
  temporaryOperatorChoice: string;

  wrongAnswers: any[] = [];

  currentQuestion: number = 0;

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
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    this.setting = JSON.parse(localStorage.getItem('setting'))
    this.temporaryOperatorChoice = this.setting.mathOperator
    if (this.temporaryOperatorChoice == 'both') this.setting.mathOperator = 'plus';
    this.showPictures();
    this.findAreaOfNumbers(this.setting.areaOfNumbersForArithmetic);
    this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
    this.mathServ.numberOfMathProblems = 1;
    this.mathServ.numberOfRightAnswers = 0;
    this.newArithmetic();
  }

  ngOnInit(): void {
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
    this.mathServ.fillArrayOfImageAmount(this.numberOne, this.numberTwo, this.setting.mathOperator)
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
    if (this.minusOperationIsGiven()) {
      this.arrangeForMinusOperation(x, y)
    }
    else {
      let result = x + y;
      this.mathServ.result = result;
      this.mathServ.generateRandomizedAnswers();
    }
  }

  arrangeForMinusOperation(x, y) {
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

  checkAnswer(selection) {
    let rightAnswer = this.mathServ.result;
    this.answerIsGiven = true;
    if (selection == rightAnswer) {
      this.mathServ.playSound('success');
      this.mathServ.numberOfRightAnswers++;
      this.updateProgressbar();
      setTimeout(() => {
        this.showEndscreen();
      }, 500)
    }
    else {
      this.mathServ.playSound('wrong')
      this.pushMathProblemInWrongAnswersArray()
    }
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
      this.earnTrophy();
      this.router.navigate(['/arithmeticEndscreen']);
    }
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.wrongAnswers.length < 1) this.giveMedal('silver')
    if (this.numberOfAnswersToSolveCorrect == 10 && this.wrongAnswers.length < 2) this.giveMedal('silver-gold')
    if (this.numberOfAnswersToSolveCorrect == 20 && this.wrongAnswers.length < 2) this.giveMedal('gold')
  }

  async giveMedal(medal) {
    let docRef = doc(this.db, "userTrophys", this.actualUser.uid); //search in the users collection for the user with the same uid as the author uid//search in the users collection for the user with the same uid as the author uid
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        medals: arrayUnion(medal),
      })
    }
    else {
      this.createNewFirestoreDocForTrophys(medal)
    }
  }

  async createNewFirestoreDocForTrophys(medal){
    await setDoc(doc(this.db, "userTrophys", this.actualUser.uid), {
      medals: [medal],
      id: this.actualUser.uid
    });
  }
}
