import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriumphComponent } from './triumph.component';

describe('TriumphComponent', () => {
  let component: TriumphComponent;
  let fixture: ComponentFixture<TriumphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriumphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriumphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
