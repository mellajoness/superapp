import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchFlightsPage } from './search-flights.page';

describe('SearchFlightsPage', () => {
  let component: SearchFlightsPage;
  let fixture: ComponentFixture<SearchFlightsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFlightsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFlightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
