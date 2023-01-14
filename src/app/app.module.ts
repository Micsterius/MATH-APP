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
import { HeaderComponent } from './header/header.component';
import { TriumphComponent } from './triumph/triumph.component';
import { SettingsComponent } from './settings/settings.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { SwiperModule } from 'swiper/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule } from "@angular/common";
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
import { DialogScreensizeComponent } from './dialog-screensize/dialog-screensize.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MentalArithmeticComponent } from './exercise/math/mental-arithmetic/mental-arithmetic.component';
import { MathEndscreenComponent } from './exercise/math/math-endscreen/math-endscreen.component';
import { WriteExerciseComponent } from './exercise/write/write-exercise/write-exercise.component';
import { WriteEndscreenComponent } from './exercise/write/write-endscreen/write-endscreen.component';
import { ReadEndscreenComponent } from './exercise/read/read-endscreen/read-endscreen.component';
import { ReadWordComponent } from './exercise/read/read-word/read-word.component';
import { ReadPhonemeComponent } from './exercise/read/read-phoneme/read-phoneme.component';
import { WrongAnswerAgainComponent } from './exercise/math/wrong-answer-again/wrong-answer-again.component';
import {MatSelectModule} from '@angular/material/select';
import { DialogErrorsComponent } from './dialog-errors/dialog-errors.component';
import { ImprintComponent } from './imprint/imprint.component';

@NgModule({
  declarations: [
    AppComponent,
    StartsceenComponent,
    TriumphComponent,
    SettingsComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    VerifyMailComponent,
    ForgetPasswordComponent,
    AuthComponent,
    PersonalComponent,
    DialogScreensizeComponent,
    MentalArithmeticComponent,
    MathEndscreenComponent,
    WriteExerciseComponent,
    WriteEndscreenComponent,
    ReadEndscreenComponent,
    ReadWordComponent,
    ReadPhonemeComponent,
    WrongAnswerAgainComponent,
    DialogErrorsComponent,
    ImprintComponent
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
    MatDialogModule,
    MatSelectModule,
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
