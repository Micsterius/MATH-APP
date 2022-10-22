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

  constructor(
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

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
}
