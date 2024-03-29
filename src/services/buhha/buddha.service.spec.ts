import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { BuddhaService } from './buddha.service';

describe('BuddhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [BuddhaService]
  }));

  it('should be created', () => {
    const service: BuddhaService = TestBed.get(BuddhaService);
    expect(service).toBeTruthy();
  });
});
