import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [UtilsService]
  }));

  it('should be created', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});
