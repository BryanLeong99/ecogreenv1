import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewItemComponent } from './register-new-item.component';

describe('RegisterNewItemComponent', () => {
  let component: RegisterNewItemComponent;
  let fixture: ComponentFixture<RegisterNewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
