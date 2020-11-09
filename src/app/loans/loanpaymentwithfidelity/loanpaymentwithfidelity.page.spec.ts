import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanpaymentwithfidelityPage } from './loanpaymentwithfidelity.page';

describe('LoanpaymentwithfidelityPage', () => {
  let component: LoanpaymentwithfidelityPage;
  let fixture: ComponentFixture<LoanpaymentwithfidelityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanpaymentwithfidelityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanpaymentwithfidelityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
