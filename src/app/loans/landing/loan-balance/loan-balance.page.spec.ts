import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanBalancePage } from './loan-balance.page';

describe('LoanBalancePage', () => {
  let component: LoanBalancePage;
  let fixture: ComponentFixture<LoanBalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanBalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
