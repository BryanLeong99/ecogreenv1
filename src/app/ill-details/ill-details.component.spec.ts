import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllDetailsComponent } from './ill-details.component';

describe('IllDetailsComponent', () => {
  let component: IllDetailsComponent;
  let fixture: ComponentFixture<IllDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
