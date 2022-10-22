import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StartsceenComponent } from './startsceen/startsceen.component';
import { TriumphComponent } from './triumph/triumph.component';
import { ArithmeticAreaComponent } from './arithmetic-area/arithmetic-area.component';
import { ArithmeticEndscreenComponent } from './arithmetic-endscreen/arithmetic-endscreen.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MainComponent } from './community/main/main.component';
import { ChatComponent } from './community/chat/chat.component';
import { FriendsComponent } from './community/friends/friends.component';
import { WrongAnswersAgainComponent } from './wrong-answers-again/wrong-answers-again.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: StartsceenComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: 'triumph', component: TriumphComponent },
  { path: 'arithmetic', component: ArithmeticAreaComponent },
  { path: 'arithmeticEndscreen', component: ArithmeticEndscreenComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'main-community', component: MainComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'wrongAnswers', component: WrongAnswersAgainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
