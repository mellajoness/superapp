import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanbalancePage } from './loanbalance.page';

describe('LoanbalancePage', () => {
  let component: LoanbalancePage;
  let fixture: ComponentFixture<LoanbalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanbalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
