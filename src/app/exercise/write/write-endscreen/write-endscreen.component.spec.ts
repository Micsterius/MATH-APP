import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteEndscreenComponent } from './write-endscreen.component';

describe('WriteEndscreenComponent', () => {
  let component: WriteEndscreenComponent;
  let fixture: ComponentFixture<WriteEndscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteEndscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteEndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
