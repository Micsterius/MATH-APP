import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  speech = new SpeechSynthesisUtterance();
  rate = 0.5;
  volume: number = 100;
  speaker: number = 1;
  voices;
  speechIsRunning: boolean = false;
  settingSpeechIsRunning: boolean = false;
  voicesAreLoaded: boolean = false;

  constructor() {
    this.speech.lang = "de";
    this.speech.rate = this.rate;
  }

  changeVoice(voice) {
    this.speaker = Number(voice)
    this.speech.voice = window.speechSynthesis.getVoices()[this.speaker]
  }

  async loadAllVoices() {
    const allVoicesObtained = new Promise(function (resolve, reject) {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length !== 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.addEventListener("voiceschanged", function () {
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        });
      }
    });
    allVoicesObtained.then(voices => {
      this.voices = voices;
      console.log(this.voices)
    });
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
    if (!this.settingSpeechIsRunning) {
      this.settingSpeechIsRunning = true;
      this.speech.rate = a;
      this.speech.text = text;
      this.speech.volume = 1 * this.volume / 100;
      window.speechSynthesis.speak(this.speech);
      setTimeout(() => this.settingSpeechIsRunning = false, 3000);
    }

  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
