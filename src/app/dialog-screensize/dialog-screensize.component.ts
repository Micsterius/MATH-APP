import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from '../shared/services/general.service';
import { SpeakingService } from '../shared/services/speaking.service';

@Component({
  selector: 'app-dialog-screensize',
  templateUrl: './dialog-screensize.component.html',
  styleUrls: ['./dialog-screensize.component.scss']
})
export class DialogScreensizeComponent implements OnInit {
  text = 'Leider unterstützt diese App deine Bildschirm größe nicht. Falls du dein Handy nicht hochkant hälst (im Landscape Modus), drehe es bitte und prüfe, ob die App funktioniert.'
  dialogScreenSizeSpeak: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogScreensizeComponent>,
    private speakService: SpeakingService,
    private generalService: GeneralService) {
    let currenTimeStamp = new Date().getTime();
    //timestamp is necessary, because else it appears a loop of 10 times of speak in resize the window
    if (currenTimeStamp - this.generalService.timeStampDialogScreenSize > 20000) {
      this.generalService.timeStampDialogScreenSize = new Date().getTime();
      this.dialogScreenSizeSpeak = true;
      this.speakService.speak(this.text, 1)
    }
  }

  ngOnInit(): void {
  }



}
