import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  speech = new SpeechSynthesisUtterance();
  rate = 0.5;
  volume: number = 100;
  speaker: number = 1;
  voices: any[] = []; // global array of available voices
  speechIsRunning: boolean = false;

  constructor() {
    this.speech.lang = "de";
    this.speech.rate = this.rate;
  }

  changeVoice(voice) {
    this.speaker = Number(voice)
    this.speech.voice = this.voices[this.speaker];
  }

  loadAllVoices() {
    window.speechSynthesis.onvoiceschanged = () => {
      // Get List of Voices
      this.voices = window.speechSynthesis.getVoices();
    
      // Initially set the First Voice in the Array.
      this.speech.voice = this.voices[0];
    };
  }

  async speak(text, a) {
    if (!this.speechIsRunning) {
      this.speechIsRunning = true;
      this.speech.rate = a;
      this.speech.text = text;
      this.speech.volume = 1 * this.volume / 100;
      window.speechSynthesis.speak(this.speech);
      setTimeout(() => this.speechIsRunning = false, 2000);
    }
  }

  async speakSettings(text, a) {
    this.speech.rate = a;
    this.speech.text = text;
    this.speech.volume = 1 * this.volume / 100;
    window.speechSynthesis.speak(this.speech);
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
