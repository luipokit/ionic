import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [MovieService]
  }));

  it('should be created', () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });
});
