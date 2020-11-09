import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BettingPage } from './betting.page';

describe('BettingPage', () => {
  let component: BettingPage;
  let fixture: ComponentFixture<BettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
