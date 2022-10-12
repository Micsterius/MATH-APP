import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StartsceenComponent } from './startsceen/startsceen.component';
import { TriumphComponent } from './triumph/triumph.component';
import { ArithmeticAreaComponent } from './arithmetic-area/arithmetic-area.component';
import { ArithmeticEndscreenComponent } from './arithmetic-endscreen/arithmetic-endscreen.component';

const routes: Routes = [
  { path: '', component: StartsceenComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'triumph', component: TriumphComponent },
  { path: 'arithmetic', component: ArithmeticAreaComponent },
  { path: 'arithmeticEndscreen', component: ArithmeticEndscreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
