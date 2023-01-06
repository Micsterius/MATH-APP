import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  highlightSettingsButton: boolean = false;
  currentExercise: string = '';
  inExercise: boolean = false;
  constructor() { }
}
