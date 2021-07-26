import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLimitAlertComponent } from './update-limit-alert.component';

describe('UpdateLimitAlertComponent', () => {
  let component: UpdateLimitAlertComponent;
  let fixture: ComponentFixture<UpdateLimitAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLimitAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLimitAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
