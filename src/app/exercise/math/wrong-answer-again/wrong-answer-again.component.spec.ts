import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongAnswerAgainComponent } from './wrong-answer-again.component';

describe('WrongAnswerAgainComponent', () => {
  let component: WrongAnswerAgainComponent;
  let fixture: ComponentFixture<WrongAnswerAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongAnswerAgainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongAnswerAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
