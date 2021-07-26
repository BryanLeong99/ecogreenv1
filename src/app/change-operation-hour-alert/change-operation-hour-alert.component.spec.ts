import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOperationHourAlertComponent } from './change-operation-hour-alert.component';

describe('ChangeOperationHourAlertComponent', () => {
  let component: ChangeOperationHourAlertComponent;
  let fixture: ComponentFixture<ChangeOperationHourAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOperationHourAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOperationHourAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
