import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  speech = new SpeechSynthesisUtterance();
  rate = 0.5;
  volume: number = 50;
  constructor() {
    this.speech.lang = "de";
    let voices = []; // global array of available voices
    voices = window.speechSynthesis.getVoices();
    this.speech.voice = voices[0];
    this.speech.rate = this.rate;

    let setting = JSON.parse(localStorage.getItem('setting')!);
    if (setting) this.volume = setting.rangeValueVolume;
  }

  speak(text, a){
    this.speech.rate = a;
    this.speech.text = text;
    this.speech.volume = 1 * this.volume / 100;
    window.speechSynthesis.speak(this.speech);
  }
}
