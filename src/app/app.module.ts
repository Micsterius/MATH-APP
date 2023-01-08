import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';

//components
import { StartsceenComponent } from './startsceen/startsceen.component';
import { ArithmeticEndscreenComponent } from './arithmetic-endscreen/arithmetic-endscreen.component';
import { HeaderComponent } from './header/header.component';
import { ArithmeticAreaComponent } from './arithmetic-area/arithmetic-area.component';
import { TriumphComponent } from './triumph/triumph.component';
import { SettingsComponent } from './settings/settings.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { WrongAnswersAgainComponent } from './wrong-answers-again/wrong-answers-again.component';
import { SwiperModule } from 'swiper/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PhonemeExerciseComponent } from './reading/phoneme-exercise/phoneme-exercise.component';
import { WordsComponent } from './reading/words/words.component';
import { CommonModule } from "@angular/common";
import { WritingComponent } from './writing/writing.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VerifyMailComponent } from './auth/verify-mail/verify-mail.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthComponent } from './auth/auth.component';
import { PersonalComponent } from './personal/personal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EndscreenComponent } from './reading/endscreen/endscreen.component';
import { WritingEndscreenComponent } from './writing-endscreen/writing-endscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    StartsceenComponent,
    TriumphComponent,
    SettingsComponent,
    ArithmeticAreaComponent,
    ArithmeticEndscreenComponent,
    WrongAnswersAgainComponent,
    PhonemeExerciseComponent,
    WordsComponent,
    HeaderComponent,
    WritingComponent,
    LoginComponent,
    SignUpComponent,
    VerifyMailComponent,
    ForgetPasswordComponent,
    AuthComponent,
    PersonalComponent,
    EndscreenComponent,
    WritingEndscreenComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    SwiperModule,
    EditorModule,
    MatExpansionModule,
    CommonModule,
    DragDropModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
