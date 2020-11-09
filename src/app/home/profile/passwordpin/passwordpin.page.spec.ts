import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordpinPage } from './passwordpin.page';

describe('PasswordpinPage', () => {
  let component: PasswordpinPage;
  let fixture: ComponentFixture<PasswordpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordpinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
