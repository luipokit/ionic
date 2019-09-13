import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
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

  // beforeEach(() => {
  //   const fixture = TestBed.createComponent(BuddhaPage);
  //   const component: BuddhaPage = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

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
      expect(data).toEqual(expectJson);
    })

    const req = httpTestingController.expectOne(PROD_SERVER_URL);
    expect(req.request.method).toBe('GET');
    req.flush({
      data: expectJson
    });

    httpTestingController.verify();
  });

  // afterEach(() => {
  //   const { httpTestingController } = setup();
  //   httpTestingController.verify();
  // });
  
});
