import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartsceenComponent } from './startsceen/startsceen.component';

const routes: Routes = [
  { path: '', component: StartsceenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
