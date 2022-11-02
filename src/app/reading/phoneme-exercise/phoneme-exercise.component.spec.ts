import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemeExerciseComponent } from './phoneme-exercise.component';

describe('PhonemeExerciseComponent', () => {
  let component: PhonemeExerciseComponent;
  let fixture: ComponentFixture<PhonemeExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonemeExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonemeExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
