import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogScreensizeComponent } from './dialog-screensize/dialog-screensize.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { GeneralService } from './shared/services/general.service';
import { SpeakingService } from './shared/services/speaking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'math-app';
  windowWidth: any;
  windowHeight: any;
  dialogScreenSizeIsOpen: boolean = false;
  windowToSmall: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public generalService: GeneralService,
    public dialog: MatDialog,
    private speakService: SpeakingService) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) this.authService.showLoginArea = false;
    else this.authService.showLoginArea = true;
  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    if (window.innerWidth < 350 && !this.dialogScreenSizeIsOpen) this.openDialogScreenSize()
    if (window.innerHeight < 740 && !this.dialogScreenSizeIsOpen) this.openDialogScreenSize()

    if (window.innerWidth > 350 && window.innerHeight > 740) this.closeDialog()
  }

  @HostListener('window:resize', ['$event'])

  resizeWindow() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    if (window.innerWidth < 350) this.openDialogScreenSize()
    if (window.innerHeight < 740) this.openDialogScreenSize()
    if (window.innerWidth > 350 && window.innerHeight > 740) this.closeDialog()
  }

  openDialogScreenSize(): void {
    this.dialogScreenSizeIsOpen = true;
    this.windowToSmall = true;
    const dialogRef = this.dialog.open(DialogScreensizeComponent);
  }

  closeDialog() {
    this.dialog.closeAll();
    this.dialogScreenSizeIsOpen = false;
    this.windowToSmall = false;
    this.speakService.stop();
    this.generalService.timeStampDialogScreenSize = 0;
  }



}
/**
 * Next Tasks
 * speak only run one time per click, then await 2sek to activate again.
 */