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

  numberOfAnswersToSolveCorrect: number = 5;
  numberOfCorrectAnswers: number = 0;

  currentQuestion: number = 0;
  setting: any;

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

  speakRate: number = 0.5;


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
    this.setting = JSON.parse(localStorage.getItem('setting'));
    this.actualUser = JSON.parse(localStorage.getItem('user'))
    if (this.setting) {
      this.findNumberOfAnswersToSolveCorrect(this.setting.numberOfAnswersToSolveCorrect);
      this.speakRate = this.setting.rangeValueRate
    }
    this.loadPhenome()
    //this.setNewExercises()
  }


  /* async setNewExercises(){
     const readingRef = collection(this.db, "lesen");
     await setDoc(doc(readingRef, 'laute', 'uebung-hoeren', 'ho'), {
       answerFour: "ho / Ho", answerThree: "ha / HA", answerTwo: "he / He", answerOne: "hu / HU",
       callOne: 'husten', callTwo: 'heben', callThree: 'Hand', callFour: 'hose',
       callRight: 'hose', right: 'ho / Ho' });
   await setDoc(doc(readingRef, 'laute', 'uebung-hoeren', 'ha'), {
     answerFour: "hi / HI", answerThree: "ha / HA", answerTwo: "hu / HU", answerOne: "ho / HO",
     callOne: 'holen', callTwo: 'hupen', callThree: 'hamster', callFour: 'hinten',
     callRight: 'hamster', right: 'ha / HA' });
   await setDoc(doc(readingRef, 'laute', 'uebung-hoeren', 'he'), {
     answerFour: "he / HE", answerThree: "hi / HI", answerTwo: "ha / HA", answerOne: "ho / HO",
     callOne: 'hof', callTwo: 'hallo', callThree: 'hieb', callFour: 'hefe',
     callRight: 'hefe', right: 'he / HE' });
   await setDoc(doc(readingRef, 'laute', 'uebung-hoeren', 'hu'), {
     answerFour: "ha / HA", answerThree: "he / HE", answerTwo: "ho / HO", answerOne: "hu / Hu",
     callOne: 'huf', callTwo: 'honig', callThree: 'herz', callFour: 'hase',
     callRight: 'huf', right: "hu / Hu" });
   await setDoc(doc(readingRef, 'laute', 'uebung-hoeren', 'hi'), {
     answerFour: "hi / HI", answerThree: "hei / HEI", answerTwo: "ha / HA", answerOne: "hu / Hu",
     callOne: 'hupen', callTwo: 'hafen', callThree: 'heilen', callFour: 'hinein',
     callRight: 'hinein', right: 'hi / HI' });
   }*/

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
    let excercise = this.allExercises[this.currentQuestion]
    this.syllableSmall = excercise.right; //variable to read
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
    }
    else {
      this.mathServ.playSound('wrong')
      setTimeout(() => {
        this.speakServ.speak(this.allExercises[this.currentQuestion].callRight, this.speakRate);
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

  helpPhoneme() {
    if (this.syllableSmall.length == 7) {
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
    this.earnTrophy();
    this.router.navigate(['']);
  }

  earnTrophy() {
    if (this.numberOfAnswersToSolveCorrect == 5 && this.currentQuestion < 6) this.giveMedal('silver')
    if (this.numberOfAnswersToSolveCorrect == 10 && this.currentQuestion < 12) this.giveMedal('silver-gold')
    if (this.numberOfAnswersToSolveCorrect == 20 && this.currentQuestion < 12) this.giveMedal('gold')
  }

  async giveMedal(medal) {
    let docRef = doc(this.db, "userTrophys", this.actualUser.uid); //search in the users collection for the user with the same uid as the author uid//search in the users collection for the user with the same uid as the author uid
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        medals: arrayUnion(medal),
      })
    }
    else this.createNewFirestoreDocForTrophys(medal);
  }

  async createNewFirestoreDocForTrophys(medal) {
    await setDoc(doc(this.db, "userTrophys", this.actualUser.uid), {
      medals: [medal],
      id: this.actualUser.uid
    });
  }
}
