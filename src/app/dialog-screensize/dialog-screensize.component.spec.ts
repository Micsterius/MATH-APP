import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScreensizeComponent } from './dialog-screensize.component';

describe('DialogScreensizeComponent', () => {
  let component: DialogScreensizeComponent;
  let fixture: ComponentFixture<DialogScreensizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogScreensizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogScreensizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
