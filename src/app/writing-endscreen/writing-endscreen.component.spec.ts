import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingEndscreenComponent } from './writing-endscreen.component';

describe('WritingEndscreenComponent', () => {
  let component: WritingEndscreenComponent;
  let fixture: ComponentFixture<WritingEndscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingEndscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingEndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
