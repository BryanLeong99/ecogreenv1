import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingCentreComponent } from './recycling-centre.component';

describe('RecyclingCentreComponent', () => {
  let component: RecyclingCentreComponent;
  let fixture: ComponentFixture<RecyclingCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecyclingCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclingCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
