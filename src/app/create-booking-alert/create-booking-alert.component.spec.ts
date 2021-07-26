import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookingAlertComponent } from './create-booking-alert.component';

describe('CreateBookingAlertComponent', () => {
  let component: CreateBookingAlertComponent;
  let fixture: ComponentFixture<CreateBookingAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookingAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
