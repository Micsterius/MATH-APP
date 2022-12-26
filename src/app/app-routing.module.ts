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
// route guard



const routes: Routes = [
  { path: '', component: StartsceenComponent},
  { path: 'settings', component: SettingsComponent },
  { path: 'triumph', component: TriumphComponent },
  { path: 'arithmetic', component: ArithmeticAreaComponent },
  { path: 'arithmeticEndscreen', component: ArithmeticEndscreenComponent },
  { path: 'wrongAnswers', component: WrongAnswersAgainComponent },
  { path: 'reading-phenomene', component: PhonemeExerciseComponent },
  { path: 'reading-words', component: WordsComponent },
  { path: 'writing-words', component: WritingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
