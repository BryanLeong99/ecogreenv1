import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayToCollectorComponent } from './pay-to-collector.component';

describe('PayToCollectorComponent', () => {
  let component: PayToCollectorComponent;
  let fixture: ComponentFixture<PayToCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayToCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayToCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
