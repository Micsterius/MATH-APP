import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

numberOfRightAnswersReading: number = 0;
numberOfTasks: number = 0;

  constructor() {

  }

  toggleClass = (event) => {
    event.target.classList.add('btn-pressed');
  }
}
