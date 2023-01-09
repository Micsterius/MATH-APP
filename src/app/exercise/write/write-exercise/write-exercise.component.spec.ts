import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteExerciseComponent } from './write-exercise.component';

describe('WriteExerciseComponent', () => {
  let component: WriteExerciseComponent;
  let fixture: ComponentFixture<WriteExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
