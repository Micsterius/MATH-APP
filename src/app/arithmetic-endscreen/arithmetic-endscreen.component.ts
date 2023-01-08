import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../shared/services/general.service';
import { MathService } from '../shared/services/math.service';
import { SpeakingService } from '../shared/services/speaking.service';
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
    public generalService: GeneralService,
    public speakService: SpeakingService) {
    if (this.trophyService.trophyEarned) this.speakService.speak(`Gut gemacht. Du hast dir eine ${this.trophyService.currentCoin} Münze verdient.`, 1)
    setTimeout(() => this.trophyService.trophyEarned = false, 3000);
    this.generalService.inExercise = false;
  }

  ngOnInit(): void {
  }
  navigateToArithmetic() {
    this.router.navigate(['/arithmetic'])
    this.generalService.inExercise = true;
  }

  navigateToWrongAnswers() {
    this.router.navigate(['/wrongAnswers']);
    this.generalService.inExercise = true;
  }

  backToStartScreen() {
    this.generalService.inExercise = false;
  }
}
