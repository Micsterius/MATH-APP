import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WriteService {

  numberOfRightAnswersWriting: number = 0;
  numberOfTasksWriting: number = 0;

  constructor() { }
}
