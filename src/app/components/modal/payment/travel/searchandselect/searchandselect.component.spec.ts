import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandselectComponent } from './searchandselect.component';

describe('SearchandselectComponent', () => {
  let component: SearchandselectComponent;
  let fixture: ComponentFixture<SearchandselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchandselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchandselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
