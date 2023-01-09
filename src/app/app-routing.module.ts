import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StartsceenComponent } from './startsceen/startsceen.component';
import { TriumphComponent } from './triumph/triumph.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyMailComponent } from './auth/verify-mail/verify-mail.component';
import { PersonalComponent } from './personal/personal.component';
import { MentalArithmeticComponent } from './exercise/math/mental-arithmetic/mental-arithmetic.component';
import { MathEndscreenComponent } from './exercise/math/math-endscreen/math-endscreen.component';
import { WrongAnswerAgainComponent } from './exercise/math/wrong-answer-again/wrong-answer-again.component';
import { ReadEndscreenComponent } from './exercise/read/read-endscreen/read-endscreen.component';
import { ReadPhonemeComponent } from './exercise/read/read-phoneme/read-phoneme.component';
import { ReadWordComponent } from './exercise/read/read-word/read-word.component';
import { WriteEndscreenComponent } from './exercise/write/write-endscreen/write-endscreen.component';
import { WriteExerciseComponent } from './exercise/write/write-exercise/write-exercise.component';
// route guard



const routes: Routes = [
  { path: '', component: StartsceenComponent},
  { path: 'register-user', component: SignUpComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'verify-email-address', component: VerifyMailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'triumph', component: TriumphComponent },
  { path: 'arithmetic', component: MentalArithmeticComponent },
  { path: 'arithmeticEndscreen', component: MathEndscreenComponent },
  { path: 'wrongAnswers', component: WrongAnswerAgainComponent },
  { path: 'reading-phenomene', component: ReadPhonemeComponent },
  { path: 'reading-words', component: ReadWordComponent },
  { path: 'writing-words', component: WriteExerciseComponent },
  { path: 'endscreen', component: ReadEndscreenComponent },
  { path: 'writing-endscreen', component: WriteEndscreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
