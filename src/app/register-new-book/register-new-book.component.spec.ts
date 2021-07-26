import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewBookComponent } from './register-new-book.component';

describe('RegisterNewBookComponent', () => {
  let component: RegisterNewBookComponent;
  let fixture: ComponentFixture<RegisterNewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
