import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsReadingComponent } from './settings-reading.component';

describe('SettingsReadingComponent', () => {
  let component: SettingsReadingComponent;
  let fixture: ComponentFixture<SettingsReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsReadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
