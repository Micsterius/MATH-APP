import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongAnswersAgainComponent } from './wrong-answers-again.component';

describe('WrongAnswersAgainComponent', () => {
  let component: WrongAnswersAgainComponent;
  let fixture: ComponentFixture<WrongAnswersAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongAnswersAgainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongAnswersAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
