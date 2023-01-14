import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MathService } from 'src/app/shared/services/math.service';
import { ReadingService } from 'src/app/shared/services/reading.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-read-phoneme',
  templateUrl: './read-phoneme.component.html',
  styleUrls: ['./read-phoneme.component.scss']
})
export class ReadPhonemeComponent implements OnInit {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: User;

  numberOfAnswersToSolveCorrect: number = 5;
  numberOfCorrectAnswers: number = 0;

  currentQuestion: number = 0;
  setting: any;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  syllableSmall: string = '';
  allExercises: any[] = [];
  showExercise: boolean = false;
  nextIsAvailable: boolean = false;

  answerSyllableOne: string = '';
  answerSyllableTwo: string = '';
  answerSyllableThree: string = '';
  answerSyllableFour: string = '';

  speakRate: number = 0.5;


  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(
    private router: Router,
    public readServ: ReadingService,
    public mathServ: MathService,
    public speakServ: SpeakingService,
    private trophyService: TrophyService,
    private authService: AuthenticationService
  ) {
    this.loadSetting();
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    this.loadPhenome();
  }
  
  ngOnInit(): void {
  }

  loadSetting() {
    this.setting = JSON.parse(localStorage.getItem('setting'));
    if (this.setting) {
      this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
      this.speakRate = this.setting.rangeValueRate
    }
  }

  findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect) {
    if (numberOfAnswersToSolveCorrect == '5') this.numberOfAnswersToSolveCorrect = 5;
    if (numberOfAnswersToSolveCorrect == '10') this.numberOfAnswersToSolveCorrect = 10;
    if (numberOfAnswersToSolveCorrect == '20') this.numberOfAnswersToSolveCorrect = 20;
  }

  loadPhenome() {
    this.allExercises.length = 0;
    let q = query(collection(this.db, "lesen", "laute", "uebung-hoeren"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allExercises.push(doc.data());
        this.fisherYatesShuffle(this.allExercises);
        this.loadExercise();
      })
    });
  }

  //randomize array
  fisherYatesShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  loadExercise() {
    this.syllableSmall = this.allExercises[this.currentQuestion].right; //variable to read
    this.loadAnswers();
    this.showExercise = true;
  }

  loadAnswers() {
    this.answerSyllableOne = this.allExercises[this.currentQuestion].answerOne
    this.answerSyllableTwo = this.allExercises[this.currentQuestion].answerTwo
    this.answerSyllableThree = this.allExercises[this.currentQuestion].answerThree
    this.answerSyllableFour = this.allExercises[this.currentQuestion].answerFour
  }

  checkResult(selection) {
    if (selection == this.allExercises[this.currentQuestion].right) return true;
    else return false;
  }

  checkAnswer(selection) {
    this.answerIsGiven = true;

    if (this.rightAnswerIsClicked(selection)) {
      this.mathServ.playSound('success');
      this.numberOfCorrectAnswers++;
      this.updateProgressbar();
      if (this.numberOfCorrectAnswers == this.numberOfAnswersToSolveCorrect) this.showEndscreen()
    }
    else {
      this.mathServ.playSound('wrong')
      setTimeout(() => this.speakServ.speak(this.allExercises[this.currentQuestion].callRight, this.speakRate), 1500);
    };
    setTimeout(() => this.nextIsAvailable = true, 1500); //time for playing write/wrong sound of 1500ms is necessary
  }

  rightAnswerIsClicked(selection) {
    return selection == this.allExercises[this.currentQuestion].right
  }

  nextExercise() {
    this.answerIsGiven = false;
    this.nextIsAvailable = false;
    this.resetAnswerButtons();
    this.currentQuestion++;
    this.loadExercise();
  }

  helpPhoneme() {
    if (this.syllableSmall.length == 7) { //length of 7 means syllable with 2 letters => an / AN (4xletter, 2x space, 1x /)
      let syllable = this.syllableSmall.slice(0, 2);
      let arrayOfLetters = syllable.split("")
      let helpText = `Das Wort beginnt mit einem ${arrayOfLetters[0]} und danach kommt ein ${arrayOfLetters[1]}`
      this.speakServ.speak(helpText, 0.9)
    }
    else {
      let syllable = this.syllableSmall.slice(0, 3);
      let arrayOfLetters = syllable.split("")
      let helpText = `Das Wort beginnt mit einem ${arrayOfLetters[0]}, ${arrayOfLetters[1]} und danach kommt ein ${arrayOfLetters[2]}`
      this.speakServ.speak(helpText, 0.9)
    }
  }

  updateProgressbar() {
    this.progressBarValue = this.numberOfCorrectAnswers * 100 / this.numberOfAnswersToSolveCorrect
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
    this.readServ.numberOfRightAnswersReading = this.numberOfCorrectAnswers
    this.currentQuestion++
    this.readServ.numberOfTasks = this.currentQuestion
    if (this.authService.additionUserDataExist()) this.earnTrophy();// guests don't get trophys because guests don't have additionUserData
    else {
      let infoText = 'Bitte registriere dich, um für deine Leistung Münzen zu erhalten.'
      this.speakServ.speak(infoText, 1)
    }
    this.router.navigate(['/endscreen']);
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.currentQuestion < 6) this.trophyService.giveMedal('bronze', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 10 && this.currentQuestion < 12) this.trophyService.giveMedal('silver', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 20 && this.currentQuestion < 22) this.trophyService.giveMedal('gold', this.actualUser.uid)
  }
}

