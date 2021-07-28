import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRatingComponent } from './my-rating.component';

describe('MyRatingComponent', () => {
  let component: MyRatingComponent;
  let fixture: ComponentFixture<MyRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
