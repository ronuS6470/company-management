import { TestBed } from '@angular/core/testing';

import { NotificationHttpService } from './notification-http.service';

describe('NotificationHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationHttpService = TestBed.get(NotificationHttpService);
    expect(service).toBeTruthy();
  });
});
