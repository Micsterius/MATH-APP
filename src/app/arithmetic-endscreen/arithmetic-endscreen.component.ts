import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arithmetic-endscreen',
  templateUrl: './arithmetic-endscreen.component.html',
  styleUrls: ['./arithmetic-endscreen.component.scss']
})
export class ArithmeticEndscreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
navigateToArithmetic(){
  this.router.navigate(['/arithmetic'])
}
}
