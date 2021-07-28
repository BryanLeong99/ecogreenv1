import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAcceptedComponent } from './item-accepted.component';

describe('ItemAcceptedComponent', () => {
  let component: ItemAcceptedComponent;
  let fixture: ComponentFixture<ItemAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
