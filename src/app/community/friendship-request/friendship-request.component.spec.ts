import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipRequestComponent } from './friendship-request.component';

describe('FriendshipRequestComponent', () => {
  let component: FriendshipRequestComponent;
  let fixture: ComponentFixture<FriendshipRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendshipRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendshipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
