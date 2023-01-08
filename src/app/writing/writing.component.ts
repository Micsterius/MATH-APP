import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MathService } from '../shared/services/math.service';
import { ReadingService } from '../shared/services/reading.service';
import { SpeakingService } from '../shared/services/speaking.service';
import { TrophyService } from '../shared/services/trophy.service';
import { User } from '../shared/services/user';
import { WriteService } from '../shared/services/write.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  checkButtonDisable: boolean = false;
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

  arrayOfMixedLetters: string[] = [];

  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;



  answer = [];
  actualUser: User;
  arrayOfLetters = [];


  constructor(
    private router: Router,
    public readServ: ReadingService,
    public mathServ: MathService,
    public speakServ: SpeakingService,
    private trophyService: TrophyService,
    private writingService: WriteService,
    private authService: AuthenticationService
  ) {
    // this.setNewExercisesWordsWriting()
    this.setting = JSON.parse(localStorage.getItem('setting'));
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    if (this.setting) {
      this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
      this.speakRate = this.setting.rangeValueRate
    }
    this.loadWords()/**/

  }
  /*
    async setNewExercisesWordsWriting() {
      await setDoc(doc(this.db, "schreiben", 'worte', 'uebung-worte', 'Unten'), {
        right: 'Unten'
      });
      await setDoc(doc(this.db, "schreiben", 'worte', 'uebung-worte', 'Ufer'), {
        right: 'Ufer'
      });
      await setDoc(doc(this.db, "schreiben", 'worte', 'uebung-worte', 'Uhr'), {
        right: 'Uhr'
      });
      await setDoc(doc(this.db, "schreiben", 'worte', 'uebung-worte', 'Uhu'), {
        right: 'Uhu'
      });
      await setDoc(doc(this.db, "schreiben", 'worte', 'uebung-worte', 'Umher'), {
        right: 'Umher'
      });
    }
*/
  findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect) {
    if (numberOfAnswersToSolveCorrect == '5') this.numberOfAnswersToSolveCorrect = 5;
    if (numberOfAnswersToSolveCorrect == '10') this.numberOfAnswersToSolveCorrect = 10;
    if (numberOfAnswersToSolveCorrect == '20') this.numberOfAnswersToSolveCorrect = 20;
  }

  loadWords() {
    this.allExercises.length = 0;
    let q = query(collection(this.db, "schreiben", "worte", "uebung-worte"))
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
    let excercise = this.allExercises[this.currentQuestion]
    this.word = excercise.right; //variable to read
    this.arrayOfLetters = this.word.split("")
    this.arrayOfMixedLetters = this.word.split("")
    this.loadLetters();
    this.showExercise = true;
  }

  loadLetters() {
    this.mixLetters()
  }

  mixLetters() {
    this.fisherYatesShuffle(this.arrayOfMixedLetters)
    if (this.arrayOfMixedLetters[0] == this.arrayOfLetters[0] && this.arrayOfMixedLetters[1] == this.arrayOfLetters[1]) this.mixLetters()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  checkAnswerWriting() {
    let letters = this.answer.toString()
    let answer = letters.replace(/[,]/g, '')
    if (this.word == answer) {
      this.checkButtonDisable = true;
      this.mathServ.playSound('success');
      this.numberOfCorrectAnswers++;
      this.updateProgressbar();
      this.answerIsGiven = true;
      setTimeout(() => {
        this.nextIsAvailable = true;
      }, 1500);
      if (this.numberOfCorrectAnswers == this.numberOfAnswersToSolveCorrect) this.showEndscreen()
    }
    else {
      this.mathServ.playSound('wrong');
      this.currentQuestion++
      this.answer.length = 0;
      this.arrayOfMixedLetters = this.word.split("")
      this.mixLetters()
    }
  }

  nextExercise() {
    this.answer.length = 0
    this.answerIsGiven = false;
    this.nextIsAvailable = false;
    this.currentQuestion++;
    this.loadExercise();
    this.checkButtonDisable = false;
  }


  ngOnInit(): void {
  }

  updateProgressbar() {
    this.progressBarValue = this.numberOfCorrectAnswers * 100 / this.numberOfAnswersToSolveCorrect
  }

  helpWriting() {
    let helpText = 'klicke auf dem Buchstaben, um zu hören, welcher es ist'
    this.speakServ.speak(helpText, 0.9)
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
    this.writingService.numberOfRightAnswersWriting = this.numberOfCorrectAnswers;
    this.currentQuestion++;
    this.writingService.numberOfTasksWriting = this.currentQuestion;
    if (this.authService.additionUserDataExist()) this.earnTrophy();// guests don't get trophys because guests don't have additionUserData
    else {
      let infoText = 'Bitte registriere dich, um für deine Leistung Münzen zu erhalten.'
      this.speakServ.speak(infoText, 1)
    }
    this.router.navigate(['/writing-endscreen']);
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.currentQuestion < 6) this.trophyService.giveMedal('bronze', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 10 && this.currentQuestion < 12) this.trophyService.giveMedal('silver', this.actualUser.uid)
    if (this.numberOfAnswersToSolveCorrect == 20 && this.currentQuestion < 22) this.trophyService.giveMedal('gold', this.actualUser.uid)
  }
}
