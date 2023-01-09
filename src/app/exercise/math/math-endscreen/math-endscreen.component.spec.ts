import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathEndscreenComponent } from './math-endscreen.component';

describe('MathEndscreenComponent', () => {
  let component: MathEndscreenComponent;
  let fixture: ComponentFixture<MathEndscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathEndscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathEndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
