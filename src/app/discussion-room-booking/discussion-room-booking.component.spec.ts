import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionRoomBookingComponent } from './discussion-room-booking.component';

describe('DiscussionRoomBookingComponent', () => {
  let component: DiscussionRoomBookingComponent;
  let fixture: ComponentFixture<DiscussionRoomBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionRoomBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionRoomBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
