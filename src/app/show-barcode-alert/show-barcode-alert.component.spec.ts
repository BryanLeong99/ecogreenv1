import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBarcodeAlertComponent } from './show-barcode-alert.component';

describe('ShowBarcodeAlertComponent', () => {
  let component: ShowBarcodeAlertComponent;
  let fixture: ComponentFixture<ShowBarcodeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBarcodeAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBarcodeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
