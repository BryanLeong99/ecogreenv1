import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLimitFailedAlertComponent } from './update-limit-failed-alert.component';

describe('UpdateLimitFailedAlertComponent', () => {
  let component: UpdateLimitFailedAlertComponent;
  let fixture: ComponentFixture<UpdateLimitFailedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLimitFailedAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLimitFailedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
