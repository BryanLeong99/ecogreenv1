import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCollectorComponent } from './register-collector.component';

describe('RegisterCollectorComponent', () => {
  let component: RegisterCollectorComponent;
  let fixture: ComponentFixture<RegisterCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
