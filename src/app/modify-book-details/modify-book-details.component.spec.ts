import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBookDetailsComponent } from './modify-book-details.component';

describe('ModifyBookDetailsComponent', () => {
  let component: ModifyBookDetailsComponent;
  let fixture: ComponentFixture<ModifyBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
