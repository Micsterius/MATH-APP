import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrophyService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  trophyEarned: boolean = false;
  currentCoin: string = '';
  constructor() { }

  async giveMedal(medal, uid) {
    this.trophyEarned = true;
    this.currentCoin = medal;
    let docRef = doc(this.db, "more-user-infos", uid); //search in the users collection for the user with the same uid as the author uid//search in the users collection for the user with the same uid as the author uid
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let userInfo = docSnap.data()
      let nbrOfGoldCoins = Number(userInfo['goldCoins'])
      let nbrOfSilverCoins = Number(userInfo['silverCoins'])
      let nbrOfBronzeCoins = Number(userInfo['bronzeCoins'])
      if (medal == 'gold') { this.updateGoldcoin(docRef, nbrOfGoldCoins) }
      if (medal == 'silver') { this.updateSilvercoin(docRef, nbrOfSilverCoins) }
      if (medal == 'bronze') { this.updateBronzecoin(docRef, nbrOfBronzeCoins) }
    }
    else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async updateGoldcoin(docRef, nbrOfGoldCoins) {
    let coins = nbrOfGoldCoins++
    await updateDoc(docRef, {
      goldCoins: coins
    })
  }

  async updateSilvercoin(docRef, nbrOfSilverCoins) {
    let coins = nbrOfSilverCoins++
    await updateDoc(docRef, {
      goldCoins: coins
    })
  }

  async updateBronzecoin(docRef, nbrOfBronzeCoins) {
    let coins = nbrOfBronzeCoins++
    await updateDoc(docRef, {
      goldCoins: coins
    })
  }
}
