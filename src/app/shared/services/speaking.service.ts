import { Injectable } from '@angular/core';
import EasySpeech from 'easy-speech'

@Injectable({
  providedIn: 'root'
})
export class SpeakingService {
  rate = 0.5;
  volume: number = 100;
  speaker: number = 1;
  voice;
  voiceName;
  voicesArray;
  speechIsRunning: boolean = false;
  settingSpeechIsRunning: boolean = false;
  voicesAreLoaded: boolean = false;
  selection: string = 'Stimme/Sprache'

  constructor() {}

  changeVoice(voice) {
   // this.speaker = Number(voice)
    this.voiceName = voice;
    this.voice = this.voicesArray.find(voice => voice.name == this.voiceName)   
  }

  async loadAllVoices() {
    /* const allVoicesObtained = new Promise(function (resolve, reject) {
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
       this.voiceOne = window.speechSynthesis.getVoices()[0]
       this.voiceTwo = window.speechSynthesis.getVoices()[1]  
       this.voiceThree = window.speechSynthesis.getVoices()[2]  */
    await EasySpeech.init() // required
    this.voicesArray = EasySpeech.voices()
    console.log(this.voicesArray)
  }

  async speak(text, a) {
    if (!this.speechIsRunning) {
      this.speechIsRunning = true;
      EasySpeech.speak({
        text: text,
        voice: this.voice,
        pitch: 1.2,
        rate: a,
        volume: 1 * this.volume / 100
      })
      /* this.speech.rate = a;
       this.speech.text = text;
       this.speech.volume = 1 * this.volume / 100;
       window.speechSynthesis.speak(this.speech);*/
      setTimeout(() => this.speechIsRunning = false, 2000);
    }
  }

  async speakSettings(text, a) {
    if (!this.settingSpeechIsRunning) {
      this.settingSpeechIsRunning = true;
      EasySpeech.speak({
        text: text,
        voice: this.voice,
        pitch: 1.2,
        rate: a,
        volume: 1 * this.volume / 100
      })
      /* this.speech.rate = a;
       this.speech.text = text;
       this.speech.volume = 1 * this.volume / 100;
       window.speechSynthesis.speak(this.speech);*/
      setTimeout(() => this.settingSpeechIsRunning = false, 1000);
    }
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
