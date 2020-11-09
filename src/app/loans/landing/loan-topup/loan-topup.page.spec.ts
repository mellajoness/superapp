import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanTopupPage } from './loan-topup.page';

describe('LoanTopupPage', () => {
  let component: LoanTopupPage;
  let fixture: ComponentFixture<LoanTopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanTopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
