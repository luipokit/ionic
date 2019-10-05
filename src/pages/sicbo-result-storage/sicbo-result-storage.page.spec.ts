import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicboResultStoragePage } from './sicbo-result-storage.page';

describe('SicboResultStoragePage', () => {
  let component: SicboResultStoragePage;
  let fixture: ComponentFixture<SicboResultStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicboResultStoragePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicboResultStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
