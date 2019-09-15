import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { UtilsService } from './utils.service';
import { template } from '@angular/core/src/render3';

describe('UtilsService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let utilsService: UtilsService;
  let json = {
    "confirmation": "success",
    "data": [
        {
            "id": "A1057",
            "title": "新譯大方廣佛華嚴經音義",
            "byline": 0,
            "juans": [
                1,
                2
            ],
            "chars": 41666,
            "_id": "5d75128f47fdf61d31eade1a"
        }
    ],
    "pages": 4614
  }

  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], 
      providers: [UtilsService]
    })
  });

  it('should be created', () => {
    service = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });

  it('should get response', () => {
    // service.HttpGet(
    //   service.PROD_SERVER_URL,
    //   {
    //     pageNo: 1,
    //     size: 10
    //   },
    //   {},
    //   (data: any) => {
    //     expect(data).toEqual({ confirmation: 'abc' })
    //   },
    //   (error: any) => {
    //     // expect(error).toEqual(123);
    //   },
    //   () => {
    //     console.log('done');
    //   }
    // )
  })
});
