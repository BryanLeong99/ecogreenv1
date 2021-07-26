import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOperationHourComponent } from './room-operation-hour.component';

describe('RoomOperationHourComponent', () => {
  let component: RoomOperationHourComponent;
  let fixture: ComponentFixture<RoomOperationHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomOperationHourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOperationHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
