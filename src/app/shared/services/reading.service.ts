import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor() {

  }

  toggleClass = (event) => {
    event.target.classList.add('btn-pressed');
  }
}
