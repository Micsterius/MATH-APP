import { Component, OnInit } from '@angular/core';
import { Arithmetic } from 'src/models/arithmetic';

@Component({
  selector: 'app-arithmetic-area',
  templateUrl: './arithmetic-area.component.html',
  styleUrls: ['./arithmetic-area.component.scss']
})
export class ArithmeticAreaComponent implements OnInit {
  arithmetic: Arithmetic | any;
  numberOne: number = 0;
  numberTwo: number = 0;
  params: any = '';
  constructor() { }

  ngOnInit(): void {
    // this.generateRandomIntegers(min, max);
  }

  newArithmetic() {
    this.arithmetic = new Arithmetic(this.params)
  }

  /* generateRandomIntegers(min, max) {
     let integerOne = document.getElementById('integer-1');
     let integerTwo = document.getElementById('integer-2');
     let x = Math.floor((Math.random() * (max + 1 - min)) + min); // random Number between min and max
     let y = Math.floor((Math.random() * (max + 1 - min)) + min); // random Number between min and max
 
     this.arrangeNumbersOnPosition(x, y, integerOne, integerTwo)
     this.calcRightAnswer(x, y);
     this.renderImageOfAmount();
 }*/

}
