import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuddhaService } from '../../services/buhha/buddha.service';
import { UtilsService } from '../../services/utils/utils.service';
import { BuddhaPage } from './buddha.page';

const expectJson = require('./expectedJson.json')
const PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha?size=10';

describe('BuddhaPage', () => {

  beforeEach(async(() => {
    // HttpClientTestingModule - Extended interactions between a data service and the HttpClient can be complex
    // and difficult to mock with spies.
    //  The HttpClientTestingModule can make these testing scenarios more manageable.
    TestBed.configureTestingModule({
      declarations: [ BuddhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule], 
      providers: [BuddhaService, UtilsService]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(BuddhaPage);
    const page: BuddhaPage = fixture.componentInstance;
    
    const buddhaService = fixture.debugElement.injector.get(BuddhaService);
    const utilsService = fixture.debugElement.injector.get(UtilsService);

    const httpTestingController = TestBed.get(HttpTestingController);

    return { fixture, page, buddhaService, utilsService, httpTestingController  }
  }

  it('should create BuddhaPage', async() => {
    const { page } = setup();
    expect(page).toBeTruthy();
  });

  it('should create BuddhaService', async() => {
    const { buddhaService } = setup();
    expect(buddhaService).toBeTruthy();
  });

  it('should create UtilsService', async() => {
    const { utilsService } = setup();
    expect(utilsService).toBeTruthy();
  });

  it('should check pageNo and size', () => {
    const { page } = setup();
    page.loadBuddha();
    expect(page.pageNo).toEqual(1)
    expect(page.size).toEqual(10)
  })

  it('should call nodejs server data', () => {
    const { buddhaService, httpTestingController } = setup();
    buddhaService.getData(PROD_SERVER_URL).subscribe(data => {
      expect(data['confirmation']).toEqual('success');
      expect(data['pages']).toEqual(462);
      expect(data).toEqual(expectJson);
    })

    // Use the expectOne matcher to confirm that the request made once
    const req = httpTestingController.expectOne(PROD_SERVER_URL);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');

    // All flush on the mock request and pass-in our mock data. 
    // The flush method completes the request using the data passed to it.
    req.flush({
      data: expectJson
    });

    /* Call the verify method on our HttpTestingController instance 
    to ensure that there are no outstanding requests to be made. */
    httpTestingController.verify();
  });
});
