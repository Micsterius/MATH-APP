import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPhonemeComponent } from './read-phoneme.component';

describe('ReadPhonemeComponent', () => {
  let component: ReadPhonemeComponent;
  let fixture: ComponentFixture<ReadPhonemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPhonemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadPhonemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
