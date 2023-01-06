import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../shared/services/general.service';
import { MathService } from '../shared/services/math.service';
import { TrophyService } from '../shared/services/trophy.service';

@Component({
  selector: 'app-arithmetic-endscreen',
  templateUrl: './arithmetic-endscreen.component.html',
  styleUrls: ['./arithmetic-endscreen.component.scss']
})
export class ArithmeticEndscreenComponent implements OnInit {

  constructor(
    private router: Router,
    public mathServ: MathService,
    public trophyService: TrophyService,
    public generalService: GeneralService) {
      setTimeout(() => {
        trophyService.trophyEarned = false
      }, 3000);
    }

  ngOnInit(): void {
  }
  navigateToArithmetic() {
    this.router.navigate(['/arithmetic'])
  }

  navigateToWrongAnswers() {
    this.router.navigate(['/wrongAnswers']);
  }

  backToStartScreen() {
    this.generalService.inExercise = false;
  }
}
