import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from '../shared/services/math.service';

@Component({
  selector: 'app-wrong-answers-again',
  templateUrl: './wrong-answers-again.component.html',
  styleUrls: ['./wrong-answers-again.component.scss']
})
export class WrongAnswersAgainComponent implements OnInit {

  constructor(
    public mathServ: MathService,
    public router: Router,
  ) {
    this.showWrongAnswer();
  }

  ngOnInit(): void {
  }
  showWrongAnswer() {
    console.log(this.mathServ.wrongAnswers)
  }

}
