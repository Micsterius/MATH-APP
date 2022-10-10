import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArithmeticAreaComponent } from './arithmetic-area.component';

describe('ArithmeticAreaComponent', () => {
  let component: ArithmeticAreaComponent;
  let fixture: ComponentFixture<ArithmeticAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArithmeticAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArithmeticAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
