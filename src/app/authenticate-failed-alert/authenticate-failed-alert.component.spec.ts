import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateFailedAlertComponent } from './authenticate-failed-alert.component';

describe('AuthenticateFailedAlertComponent', () => {
  let component: AuthenticateFailedAlertComponent;
  let fixture: ComponentFixture<AuthenticateFailedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateFailedAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateFailedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
