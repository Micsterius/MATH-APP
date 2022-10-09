import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsceenComponent } from './startsceen.component';

describe('StartsceenComponent', () => {
  let component: StartsceenComponent;
  let fixture: ComponentFixture<StartsceenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartsceenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartsceenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
