import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  wrongAnswers: any = [];
  result1: number = 0;
  result2: number = 0;
  result3: number = 0;
  result4: number = 0;
  result: number = 0;

  mathSetting: any;
  imageArrayNumberOne: string[] = [];
  imageArrayNumberTwo: string[] = [];

  numberOfRightAnswers: number = 0;
  numberOfMathProblems: number = 1;
  volume: number = 50
  
  constructor(
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    
  ) { 
    let setting = JSON.parse(localStorage.getItem('setting')!);
    if (setting) this.volume = setting.rangeValueVolume;
  }

  generateRandomizedAnswers() {
    let x = Math.floor(Math.random() * 4 + 1); // generate a randomize number between 1 and 4
    if (x == 1) this.showAnswers1()
    if (x == 2) this.showAnswers2()
    if (x == 3) this.showAnswers3()
    if (x == 4) this.showAnswers4()
  }

  showAnswers1() {
    this.result1 = this.result;
    this.result2 = this.result + 1;
    if (this.result < 1) this.result3 = this.result + 3;//make sure there is no negative number in the result options
    else this.result3 = this.result - 1;
    this.result4 = this.result + 2;
  }

  showAnswers2() {
    if (this.result < 2) this.result1 = this.result + 3; //make sure there is no negative number in the result options
    else this.result1 = this.result - 2;
    this.result2 = this.result;
    if (this.result < 1) this.result3 = this.result + 2;//make sure there is no negative number in the result options
    else this.result3 = this.result - 1;
    this.result4 = this.result + 1;
  }

  showAnswers3() {
    this.result1 = this.result + 2;
    this.result2 = this.result + 3;
    this.result3 = this.result;
    if (this.result < 1) this.result4 = this.result + 1;//make sure there is no negative number in the result options
    else this.result4 = this.result - 1;
  }

  showAnswers4() {
    if (this.result < 1) this.result1 = this.result + 2;//make sure there is no negative number in the result options
    else this.result1 = this.result - 1;
    this.result2 = this.result + 4;
    if (this.result < 2) this.result3 = this.result + 1; //make sure there is no negative number in the result options
    else this.result3 = this.result - 2;
    this.result4 = this.result;
  }

  fillArrayOfImageAmount(numberOne, numberTwo, mathOperator) {
    this.imageArrayNumberOne.length = 0;
    this.imageArrayNumberTwo.length = 0;
    
    for (let i = 0; i < numberOne; i++) this.imageArrayNumberOne.push('nbr-1.svg');
    if (mathOperator == 'plus') for (let i = 0; i < numberTwo; i++) this.imageArrayNumberTwo.push('nbr-1.svg');
    if (mathOperator == 'minus') for (let i = 0; i < numberTwo; i++) this.imageArrayNumberTwo.push('nbr-1-red.svg');
    console.log('Hello', mathOperator)
  }

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

  toggleClass = (event) => {
    event.target.classList.add('btn-pressed');
  }

  playSound(event) {
    let AUDIO_RESULT = new Audio()
    AUDIO_RESULT.src = "./assets/audio/" + event + ".mp3"
    AUDIO_RESULT.volume = 0.6 * this.volume / 100;
    AUDIO_RESULT.load();
    AUDIO_RESULT.play();
  }

  checkResult(selection) {
    if (selection == this.result) return true;
    else return false;
  }
}
