import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDoc, getFirestore, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { MathService } from 'src/app/shared/services/math.service';
import { ReadingService } from 'src/app/shared/services/reading.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phoneme-exercise',
  templateUrl: './phoneme-exercise.component.html',
  styleUrls: ['./phoneme-exercise.component.scss']
})
export class PhonemeExerciseComponent implements OnInit {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  actualUser: User;

  numberOfAnswersToSolveCorrect: number = 10;
  numberOfCorrectAnswers: number = 0;

  currentQuestion: number = 0;

  chosenOperator: number = 1;
  workingOperator: number = 1;

  answerIsGiven: boolean = false;
  progressBarValue: number = 0;
  syllableSmall: string = '';
  syllableBig: string = '';
  allExercises: any[] = [];
  showExercise: boolean = false;
  nextIsAvailable: boolean = false;

  answerSyllableOne: string = '';
  answerSyllableTwo: string = '';
  answerSyllableThree: string = '';
  answerSyllableFour: string = '';


  @ViewChild("answerButtonOne") answerButtonOne: ElementRef;
  @ViewChild("answerButtonTwo") answerButtonTwo: ElementRef;
  @ViewChild("answerButtonThree") answerButtonThree: ElementRef;
  @ViewChild("answerButtonFour") answerButtonFour: ElementRef;

  constructor(
    private router: Router,
    public readServ: ReadingService,
    public mathServ: MathService,
    public speakServ: SpeakingService
  ) {
    /*  this.wrongAnswers.length = 0;
      this.actualUser = JSON.parse(localStorage.getItem('user'))
      this.mathSetting = JSON.parse(localStorage.getItem('readSetting'))
      this.temporaryOperatorChoice = this.mathSetting.mathOperator
      if (this.temporaryOperatorChoice == 'both') this.mathSetting.mathOperator = 'plus';
      this.showPictures();
      console.log(this.mathSetting)
      this.findAreaOfNumbers(this.mathSetting.areaOfNumbersForArithmetic);
      this.findNumberOfAnswersToSolveCorrect(this.mathSetting.numberOfAnswersToSolveCorrect);
      this.readServ.numberOfReadingProblems = 1;
      this.readServ.numberOfRightAnswers = 0
      this.newArithmetic();*/

    this.loadPhenome()
  }

  loadPhenome() {
    let q = query(collection(this.db, "lesen", "laute", "uebung-hoeren"))
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allExercises.push(doc.data())
        console.log(this.allExercises)
        this.loadExercise();
      })
    });

  }

  loadExercise() {
    let excercise = this.allExercises[this.currentQuestion]
    this.syllableSmall = excercise.right;
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
      this.numberOfCorrectAnswers++

    }
    else {
      this.mathServ.playSound('wrong')
      setTimeout(() => {
        this.speakServ.speak(this.allExercises[this.currentQuestion].callRight);
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



  findNumberOfAnswersToSolveCorrect(numberOfAnswersToSolveCorrect) {
    if (numberOfAnswersToSolveCorrect == '5') this.numberOfAnswersToSolveCorrect = 5;
    if (numberOfAnswersToSolveCorrect == '10') this.numberOfAnswersToSolveCorrect = 10;
    if (numberOfAnswersToSolveCorrect == '20') this.numberOfAnswersToSolveCorrect = 20;
  }


  /*  checkAnswer(selection) {
       let rightAnswer = this.mathServ.result;
       this.answerIsGiven = true;
   
       if (selection == rightAnswer) {
         this.mathServ.playSound('success');
         this.mathServ.numberOfRightAnswers++;
         this.updateProgressbar();
   
         setTimeout(() => {
           this.showEndscreen();
         }, 500);
       }
       else {
         this.mathServ.playSound('wrong')
   
         this.pushMathProblemInWrongAnswersArray()
       };
    }*/


  updateProgressbar() {
    //   this.progressBarValue = this.mathServ.numberOfRightAnswers * 100 / this.numberOfAnswersToSolveCorrect
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

    /*    if (this.mathServ.numberOfRightAnswers == this.numberOfAnswersToSolveCorrect) {
          this.mathServ.wrongAnswers = this.wrongAnswers;
          this.earnTrophy();
          this.router.navigate(['/arithmeticEndscreen']);
        }*/
  }

  earnTrophy() {
    /*   if (this.numberOfAnswersToSolveCorrect == 5 && this.wrongAnswers.length < 1) this.giveMedal('silver')
       if (this.numberOfAnswersToSolveCorrect == 10 && this.wrongAnswers.length < 2) this.giveMedal('silver-gold')
       if (this.numberOfAnswersToSolveCorrect == 20 && this.wrongAnswers.length < 2) this.giveMedal('gold')*/
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
      await setDoc(doc(this.db, "userTrophys", this.actualUser.uid), {
        medals: [medal],
        id: this.actualUser.uid
      });
    }
  }
}
