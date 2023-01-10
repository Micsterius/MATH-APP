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
   /* if(this.speaker == 0) this.speech.voice = this.voiceOne
    if(this.speaker == 1) this.speech.voice = this.voiceTwo
    if(this.speaker == 2) this.speech.voice = this.voiceThree*/
    //this.speech.voice = window.speechSynthesis.getVoices()[this.speaker]
    this.speech.voice = this.voices[this.speaker]
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
      this.showVoiceSelection();
    });
     /* this.voiceOne = window.speechSynthesis.getVoices()[0]
      this.voiceTwo = window.speechSynthesis.getVoices()[1]  
      this.voiceThree = window.speechSynthesis.getVoices()[2]  */
  }

  showVoiceSelection(){
    console.log('A')
    this.voicesAreLoaded = true;
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

  stop() {
    window.speechSynthesis.cancel();
  }
}
