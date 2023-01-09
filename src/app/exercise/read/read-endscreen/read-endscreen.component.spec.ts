import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEndscreenComponent } from './read-endscreen.component';

describe('ReadEndscreenComponent', () => {
  let component: ReadEndscreenComponent;
  let fixture: ComponentFixture<ReadEndscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEndscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
