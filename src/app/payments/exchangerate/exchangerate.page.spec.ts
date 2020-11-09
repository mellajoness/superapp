import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExchangeratePage } from './exchangerate.page';

describe('ExchangeratePage', () => {
  let component: ExchangeratePage;
  let fixture: ComponentFixture<ExchangeratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangeratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
