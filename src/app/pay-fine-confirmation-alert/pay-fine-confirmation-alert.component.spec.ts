import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFineConfirmationAlertComponent } from './pay-fine-confirmation-alert.component';

describe('PayFineConfirmationAlertComponent', () => {
  let component: PayFineConfirmationAlertComponent;
  let fixture: ComponentFixture<PayFineConfirmationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFineConfirmationAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFineConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
