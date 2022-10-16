import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  searchValue: string = "";

  users: User[] = [];
  showUser: boolean = false;
  userNames: string[] = [];
  searchMatchesUsers: string[] = [];



  constructor(
    public firstore: AngularFirestore,
    private router: Router) { }


  ngOnInit(): void {

  }

  loadsearch() {
    if (this.searchValue !== '') {
      this.firstore.collection(`users`, ref => ref
        .orderBy("displayName")
        .startAt(this.searchValue)
        .limit(6))
        .valueChanges()
        .subscribe((obj: User[]) =>
          this.users = obj
        );
      console.log(this.users)

      this.filterUsers();
    }
    else this.users = [];
  }

  filterUsers() {
    if (this.searchValue.length > 0) {
      this.userNames = [];
      for (let i = 0; i < this.users.length; i++) {
        const displayName = this.users[i].displayName;
        this.userNames.push(displayName)
      }
      this.searchMatchesUsers = [];
      this.searchMatchesUsers = this.userNames.filter(editor => {
        const regex = new RegExp(`^${this.searchValue}`, "gi")
        return editor.match(regex)
      })
    }
  }


  navigateToChat() {
    this.router.navigate(['/chat'])
  }

  navigateToFriends() {
    this.router.navigate(['/friends'])
  }
}
