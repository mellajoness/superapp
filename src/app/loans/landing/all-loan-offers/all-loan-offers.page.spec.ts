import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllLoanOffersPage } from './all-loan-offers.page';

describe('AllLoanOffersPage', () => {
  let component: AllLoanOffersPage;
  let fixture: ComponentFixture<AllLoanOffersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLoanOffersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllLoanOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
