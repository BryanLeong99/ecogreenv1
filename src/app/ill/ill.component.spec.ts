import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllComponent } from './ill.component';

describe('IllComponent', () => {
  let component: IllComponent;
  let fixture: ComponentFixture<IllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
