import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArithmeticEndscreenComponent } from './arithmetic-endscreen.component';

describe('ArithmeticEndscreenComponent', () => {
  let component: ArithmeticEndscreenComponent;
  let fixture: ComponentFixture<ArithmeticEndscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArithmeticEndscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArithmeticEndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
