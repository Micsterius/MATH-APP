import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StartsceenComponent } from './startsceen/startsceen.component';
import { TriumphComponent } from './triumph/triumph.component';
import { ArithmeticAreaComponent } from './arithmetic-area/arithmetic-area.component';
import { ArithmeticEndscreenComponent } from './arithmetic-endscreen/arithmetic-endscreen.component';
import { WrongAnswersAgainComponent } from './wrong-answers-again/wrong-answers-again.component';
import { PhonemeExerciseComponent } from './reading/phoneme-exercise/phoneme-exercise.component';
import { WordsComponent } from './reading/words/words.component';
import { WritingComponent } from './writing/writing.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyMailComponent } from './auth/verify-mail/verify-mail.component';
import { PersonalComponent } from './personal/personal.component';
import { EndscreenComponent } from './reading/endscreen/endscreen.component';
import { WritingEndscreenComponent } from './writing-endscreen/writing-endscreen.component';
// route guard



const routes: Routes = [
  { path: '', component: StartsceenComponent},
  { path: 'register-user', component: SignUpComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'verify-email-address', component: VerifyMailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'triumph', component: TriumphComponent },
  { path: 'arithmetic', component: ArithmeticAreaComponent },
  { path: 'arithmeticEndscreen', component: ArithmeticEndscreenComponent },
  { path: 'wrongAnswers', component: WrongAnswersAgainComponent },
  { path: 'reading-phenomene', component: PhonemeExerciseComponent },
  { path: 'reading-words', component: WordsComponent },
  { path: 'writing-words', component: WritingComponent },
  { path: 'endscreen', component: EndscreenComponent },
  { path: 'writing-endscreen', component: WritingEndscreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
