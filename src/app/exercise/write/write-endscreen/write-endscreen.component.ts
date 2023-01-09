import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MathService } from 'src/app/shared/services/math.service';
import { SpeakingService } from 'src/app/shared/services/speaking.service';
import { TrophyService } from 'src/app/shared/services/trophy.service';
import { WriteService } from 'src/app/shared/services/write.service';

@Component({
  selector: 'app-write-endscreen',
  templateUrl: './write-endscreen.component.html',
  styleUrls: ['./write-endscreen.component.scss']
})
export class WriteEndscreenComponent implements OnInit {


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

