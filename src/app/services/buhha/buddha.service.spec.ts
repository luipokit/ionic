import { TestBed } from '@angular/core/testing';

import { BuddhaService } from './buddha.service';

describe('BuddhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuddhaService = TestBed.get(BuddhaService);
    expect(service).toBeTruthy();
  });
});
