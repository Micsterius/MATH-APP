import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../shared/services/general.service';
import { MathService } from '../shared/services/math.service';
import { ReadingService } from '../shared/services/reading.service';
import { SpeakingService } from '../shared/services/speaking.service';
import { TrophyService } from '../shared/services/trophy.service';
import { WriteService } from '../shared/services/write.service';

@Component({
  selector: 'app-writing-endscreen',
  templateUrl: './writing-endscreen.component.html',
  styleUrls: ['./writing-endscreen.component.scss']
})
export class WritingEndscreenComponent implements OnInit {

  constructor(
    private router: Router,
    public mathServ: MathService,
    public trophyService: TrophyService,
    public generalService: GeneralService,
    public writingService: WriteService,
    public speakService: SpeakingService) {
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
