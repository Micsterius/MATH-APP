import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MathService } from 'src/app/shared/services/math.service';
import { ReadingService } from 'src/app/shared/services/reading.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  constructor(
    private router: Router,
    public mathServ: MathService,
    public trophyService: TrophyService,
    public generalService: GeneralService,
    public readingService: ReadingService,
    public speakService: SpeakingService
  ) {
    if (this.trophyService.trophyEarned) this.speakService.speak(`Gut gemacht. Du hast dir eine ${this.trophyService.currentCoin} Münze verdient.`, 1)
    setTimeout(() => this.trophyService.trophyEarned = false, 3000);
    this.generalService.inExercise = false;
   }

  ngOnInit(): void {
  }

  navigateToExercise() {
    this.router.navigate([`/${this.generalService.currentExercise}`])
    this.generalService.inExercise = true;
  }

  backToStartScreen() {
    this.generalService.inExercise = false;
  }
}
