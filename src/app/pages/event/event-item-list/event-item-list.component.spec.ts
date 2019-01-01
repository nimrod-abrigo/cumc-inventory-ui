import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemListComponent } from './event-item-list.component';

describe('EventItemListComponent', () => {
  let component: EventItemListComponent;
  let fixture: ComponentFixture<EventItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
