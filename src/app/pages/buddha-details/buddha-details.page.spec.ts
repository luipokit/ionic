import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

import { BuddhaDetailsPage } from './buddha-details.page';

describe('BuddhaDetailsPage', () => {
  let component: BuddhaDetailsPage;
  let fixture: ComponentFixture<BuddhaDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddhaDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports:[RouterModule.forRoot([]), HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddhaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
