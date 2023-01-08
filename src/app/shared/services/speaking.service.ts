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
  constructor() {
    this.speech.lang = "de";
    this.speech.rate = this.rate;
  }

  changeVoice(voice) {
    this.speaker = Number(voice)
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.speech.voice = this.voices[this.speaker];
    }
    this.speech.voice = this.voices[this.speaker];
  }

  speak(text, a) {
    this.speech.rate = a;
    this.speech.text = text;
    this.speech.volume = 1 * this.volume / 100;
    window.speechSynthesis.speak(this.speech);
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
