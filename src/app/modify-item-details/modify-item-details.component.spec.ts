import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyItemDetailsComponent } from './modify-item-details.component';

describe('ModifyItemDetailsComponent', () => {
  let component: ModifyItemDetailsComponent;
  let fixture: ComponentFixture<ModifyItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
