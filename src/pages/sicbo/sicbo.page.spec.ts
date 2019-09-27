import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicboPage } from './sicbo.page';

describe('SicboPage', () => {
  let component: SicboPage;
  let fixture: ComponentFixture<SicboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicboPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
