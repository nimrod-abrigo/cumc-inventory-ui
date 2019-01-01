import { TestBed } from '@angular/core/testing';

import { EventItemService } from './event-item.service';

describe('EventItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventItemService = TestBed.get(EventItemService);
    expect(service).toBeTruthy();
  });
});
