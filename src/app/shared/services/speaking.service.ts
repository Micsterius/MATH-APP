import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  speech = new SpeechSynthesisUtterance();
  constructor() {
    this.speech.lang = "de";
    let voices = []; // global array of available voices
    voices = window.speechSynthesis.getVoices();
    this.speech.voice = voices[0];
    this.speech.rate = 0.5;
  }

  speak(text){
    this.speech.text = text;
    window.speechSynthesis.speak(this.speech);
  }
}
