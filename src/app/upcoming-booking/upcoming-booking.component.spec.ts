import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingBookingComponent } from './upcoming-booking.component';

describe('UpcomingBookingComponent', () => {
  let component: UpcomingBookingComponent;
  let fixture: ComponentFixture<UpcomingBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
