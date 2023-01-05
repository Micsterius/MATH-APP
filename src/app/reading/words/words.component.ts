import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { arrayUnion, collection, doc, getDoc, getFirestore, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { MathService } from 'src/app/shared/services/math.service';
import { ReadingService } from 'src/app/shared/services/reading.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';
import { User } from 'src/app/shared/services/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  numberOfAnswersToSolveCorrect: number = 5;
  numberOfCorrectAnswers: number = 0;

  currentQuestion: number = 0;
  setting: any;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  word: string = '';
  syllableBig: string = '';
  allExercises: any[] = [];
  showExercise: boolean = false;
  nextIsAvailable: boolean = false;

  answerSyllableOne: string = '';
  answerSyllableTwo: string = '';
  answerSyllableThree: string = '';
  answerSyllableFour: string = '';

  speakRate: number = 0.5;

  loadFinished: boolean = false;
  actualUser: User;

  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(
    private router: Router,
    public readServ: ReadingService,
    public mathServ: MathService,
    public speakServ: SpeakingService,
    private trophyService: TrophyService
  ) {
    //  this.setNewExercisesWords()
    this.setting = JSON.parse(localStorage.getItem('setting'));
    this.actualUser = JSON.parse(localStorage.getItem('user'))

    if (this.setting) {
      this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
      this.speakRate = this.setting.rangeValueRate
    }
    this.loadWords()

  }

  /*async setNewExercisesWords() {
    await setDoc(doc(this.db, "lesen", 'worte', 'uebung-worte', 'Wagen'), {
      answerFour: "4", answerThree: "3", answerTwo: "2", answerOne: "1",
      callOne: 'Wandel', callTwo: 'Was', callThree: 'Wagen', callFour: 'Wer',
      callRight: 'Wagen', right: '3'
    });
    await setDoc(doc(this.db, "lesen", 'worte', 'uebung-worte', 'Vorne'), {
      answerFour: "4", answerThree: "3", answerTwo: "2", answerOne: "1",
      callOne: 'Vase', callTwo: 'Vorne', callThree: 'Voran', callFour: 'Vage',
      callRight: 'Vorne', right: '2'
    });
    await setDoc(doc(this.db, "lesen", 'worte', 'uebung-worte', 'Unten'), {
      answerFour: "4", answerThree: "3", answerTwo: "2", answerOne: "1",
      callOne: 'Ufer', callTwo: 'Unser', callThree: 'Umstand', callFour: 'Unten',
      callRight: 'Unten', right: '4'
    });
    await setDoc(doc(this.db, "lesen", 'worte', 'uebung-worte', 'Üben'), {
      answerFour: "4", answerThree: "3", answerTwo: "2", answerOne: "1",
      callOne: 'Übel', callTwo: 'Überraschung', callThree: 'Üben', callFour: 'Über',
      callRight: 'Üben', right: "3"
    });
    await setDoc(doc(this.db, "lesen", 'worte', 'uebung-worte', 'Ändern'), {
      answerFour: "4", answerThree: "3", answerTwo: "2", answerOne: "1",
      callOne: 'Ändern', callTwo: 'Ärmel', callThree: 'Ärger', callFour: 'ähnlich',
      callRight: 'Ändern', right: '1'
    });
  }*/

  findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect) {
    if (numberOfAnswersToSolveCorrect == '5') this.numberOfAnswersToSolveCorrect = 5;
    if (numberOfAnswersToSolveCorrect == '10') this.numberOfAnswersToSolveCorrect = 10;
    if (numberOfAnswersToSolveCorrect == '20') this.numberOfAnswersToSolveCorrect = 20;
  }

  loadWords() {
    this.allExercises.length = 0;
    let q = query(collection(this.db, "lesen", "worte", "uebung-worte"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allExercises.push(doc.data());
        this.fisherYatesShuffle(this.allExercises);
        this.loadExercise();
        this.loadFinished = true;
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
    let excercise = this.allExercises[this.currentQuestion]
    this.word = excercise.callRight; //variable to read
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
    let rightAnswer = this.allExercises[this.currentQuestion].right;
    this.answerIsGiven = true;

    if (selection == rightAnswer) {
      this.mathServ.playSound('success');
      this.numberOfCorrectAnswers++;
      this.updateProgressbar();
      if (this.numberOfCorrectAnswers == this.numberOfAnswersToSolveCorrect) this.showEndscreen()
      console.log(this.currentQuestion)
    }
    else {
      this.mathServ.playSound('wrong')
      setTimeout(() => {
        this.speakServ.speak(this.allExercises[this.currentQuestion].callRight, this.speakRate / 100);
      }, 1500);
    };
    setTimeout(() => {
      this.nextIsAvailable = true;
    }, 1500);
  }

  nextExercise() {
    this.answerIsGiven = false;
    this.nextIsAvailable = false;
    this.resetAnswerButtons();
    this.currentQuestion++;
    this.loadExercise();
  }


  ngOnInit(): void {
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

  helpWord() {
    if (this.allExercises[this.currentQuestion].helpText.length > 0) this.speakServ.speak(this.allExercises[this.currentQuestion].helpText, 0.9)
    else {
      let helpText = 'Für dieses Wort gibt es keine Hilfe'
      this.speakServ.speak(helpText, 0.9)
    }
  }

  showEndscreen() {
    this.readServ.numberOfRightAnswersReading = this.numberOfCorrectAnswers
    this.currentQuestion++
    this.readServ.numberOfTasks = this.currentQuestion
    this.earnTrophy();
    this.router.navigate(['/endscreen']);
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.currentQuestion < 6) this.trophyService.giveMedal('bronze', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 10 && this.currentQuestion < 12) this.trophyService.giveMedal('silver', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 20 && this.currentQuestion < 22) this.trophyService.giveMedal('gold', this.actualUser.uid)
  }
}

