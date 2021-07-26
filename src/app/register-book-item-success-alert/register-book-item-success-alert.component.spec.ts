import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBookItemSuccessAlertComponent } from './register-book-item-success-alert.component';

describe('RegisterBookItemSuccessAlertComponent', () => {
  let component: RegisterBookItemSuccessAlertComponent;
  let fixture: ComponentFixture<RegisterBookItemSuccessAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBookItemSuccessAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBookItemSuccessAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
