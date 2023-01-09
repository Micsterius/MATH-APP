import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from 'src/app/shared/services/math.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';


@Component({
  selector: 'app-wrong-answer-again',
  templateUrl: './wrong-answer-again.component.html',
  styleUrls: ['./wrong-answer-again.component.scss']
})
export class WrongAnswerAgainComponent implements OnInit {

  numberOne: number = 0;
  numberTwo: number = 0;
  mathSetting: any;
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

  wrongAnswers: any[] = [];

  currentQuestion: number = 0;
  numberOfRightAnswers: number = 0;

  numberOfMathProblems: number = 1;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  showArithmeticEndscreen: boolean = false;
  numberOfExercises: number = 0;

  currentExercise: any;
  setting;

  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(
    public mathServ: MathService,
    public router: Router,
    public speakService: SpeakingService
  ) {
    this.loadWrongAnswerExercise();
    this.setting = JSON.parse(localStorage.getItem('setting'))
    this.showPictures()
    console.log(this.setting)
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

  loadWrongAnswerExercise() {
    this.wrongAnswers = this.mathServ.wrongAnswers;
    this.currentExercise = this.wrongAnswers[0];
    this.numberOne = this.currentExercise.numberOne;
    this.numberTwo = this.currentExercise.numberTwo;
    this.operator = this.currentExercise.operator;
    this.mathServ.result = this.currentExercise.result;
    this.numberOfExercises = this.wrongAnswers.length
    let operatorForAmount = this.transformOperator()
    this.mathServ.generateRandomizedAnswers();
    this.mathServ.fillArrayOfImageAmount(this.numberOne, this.numberTwo, operatorForAmount)
  }

  transformOperator(){
    if(this.operator == '+') return 'plus'
    else return 'minus'
  }



  checkAnswer(selection) {
    let rightAnswer = this.mathServ.result;
    this.answerIsGiven = true;

    if (selection == rightAnswer) {
      this.mathServ.playSound('success');
      this.numberOfRightAnswers++;
      this.updateProgressbar();
      this.wrongAnswers.shift();
      setTimeout(() => this.showEndscreen(), 500);
    }
    else {
      this.mathServ.playSound('wrong');
      this.pushMathProblemInWrongAnswersArray();
      this.wrongAnswers.shift();
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
    this.progressBarValue = this.numberOfRightAnswers * 100 / this.numberOfExercises
  }

  showEndscreen() {
    if (this.wrongAnswers.length == 0) {
      this.router.navigate(['/arithmeticEndscreen']);
    }
  }

  nextMathProblem() {
    this.answerIsGiven = false;
    this.currentExercise = this.wrongAnswers[0];
    this.numberOne = this.currentExercise.numberOne;
    this.numberTwo = this.currentExercise.numberTwo;
    this.operator = this.currentExercise.operator;
    this.mathServ.result = this.currentExercise.result;
    this.mathServ.generateRandomizedAnswers();
    this.resetAnswerButtons();
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

  helptext() {
    if (this.helpSpeakPictures()) {
      let text = 'Wenn du auf die bunten Kugeln tippst, verändert sich ihre Farbe. Das hilft dir beim Zählen'
      this.speakService.speak(text, 1)
    }
  }

  helpSpeakPictures() {
    return (this.setting.showPicturesForAmount == 'yes' || this.setting.showPicturesForAmount == 'partly')
  }
}
