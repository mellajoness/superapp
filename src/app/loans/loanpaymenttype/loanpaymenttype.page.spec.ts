import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanpaymenttypePage } from './loanpaymenttype.page';

describe('LoanpaymenttypePage', () => {
  let component: LoanpaymenttypePage;
  let fixture: ComponentFixture<LoanpaymenttypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanpaymenttypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanpaymenttypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
