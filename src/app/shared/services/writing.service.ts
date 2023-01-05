import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WritingService {
  numberOfRightAnswersWriting: number = 0;
  numberOfTasksWriting: number = 0;

  constructor() { }
}
