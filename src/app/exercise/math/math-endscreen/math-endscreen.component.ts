import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MathService } from 'src/app/shared/services/math.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';

@Component({
  selector: 'app-math-endscreen',
  templateUrl: './math-endscreen.component.html',
  styleUrls: ['./math-endscreen.component.scss']
})
export class MathEndscreenComponent implements OnInit {

  constructor(
    private router: Router,
    public mathServ: MathService,
    public trophyService: TrophyService,
    public generalService: GeneralService,
    public speakService: SpeakingService) {
    //if user earned a trophy, it will be shown in endscreen for 3s
    if (this.trophyService.trophyEarned) this.speakService.speak(`Gut gemacht. Du hast dir eine ${this.trophyService.currentCoin} Münze verdient.`, 1)
    setTimeout(() => this.trophyService.trophyEarned = false, 3000);
    this.generalService.inExercise = false; //Headerimages will be shown
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
