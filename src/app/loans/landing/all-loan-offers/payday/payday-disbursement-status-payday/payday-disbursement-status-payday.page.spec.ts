import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaydayDisbursementStatusPaydayPage } from './payday-disbursement-status-payday.page';

describe('PaydayDisbursementStatusPaydayPage', () => {
  let component: PaydayDisbursementStatusPaydayPage;
  let fixture: ComponentFixture<PaydayDisbursementStatusPaydayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydayDisbursementStatusPaydayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaydayDisbursementStatusPaydayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
