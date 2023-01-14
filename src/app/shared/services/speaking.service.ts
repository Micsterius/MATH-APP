import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  speech = new SpeechSynthesisUtterance();
  rate = 0.5;
  volume: number = 100;
  speaker: number = 1;
  voiceName;
  voicesArray;
  speechIsRunning: boolean = false;
  settingSpeechIsRunning: boolean = false;
  voicesAreLoaded: boolean = false;
  selection: string = 'Stimme/Sprache'
  voicesGerman = [];

  constructor() {
    this.speech.lang = "de";
    this.speech.rate = this.rate;
  }

  changeVoice(voice) {
    this.voiceName = voice;
    this.speech.voice = this.voicesArray.find(voice => voice.name == this.voiceName)
  }

  async loadAllVoices() {
    const allVoicesObtained = new Promise(function (resolve, reject) {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length !== 0) resolve(voices);
      else {
        window.speechSynthesis.addEventListener("voiceschanged", function () {
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        });
      }
    });
    allVoicesObtained.then(voices => {
      this.voicesArray = voices;
      this.findAllGermanVoices()
    });
  }

  findAllGermanVoices() {
    this.voicesGerman.length = 0;
    this.voicesArray.forEach(voice => {
      let voiceName = voice.name.split(' ', 5)
      let check = voiceName.some(text => text == 'German' || text == 'Deutsch' || text == 'german' || text == 'deutsch' || text == 'Katja' || text == 'Jan' || text == 'Conrad' || text == 'Ingrid' || text == 'Amala' || text == 'Jonas')
      if (check) this.voicesGerman.push(voice)
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
      setTimeout(() => this.settingSpeechIsRunning = false, 1000);
    }
  }

  async speakSettingsInfo(text, a) {
    if (!this.settingSpeechIsRunning) {
      this.settingSpeechIsRunning = true;
      this.speech.rate = a;
      this.speech.text = text;
      this.speech.volume = 1 * this.volume / 100;
      window.speechSynthesis.speak(this.speech);
      setTimeout(() => this.settingSpeechIsRunning = false, 4000);
    }
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
