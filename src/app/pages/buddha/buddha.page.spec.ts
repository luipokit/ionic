import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhaPage } from './buddha.page';

describe('BuddhaPage', () => {
  let component: BuddhaPage;
  let fixture: ComponentFixture<BuddhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
