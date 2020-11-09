import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaydayDisbursementStatusPage } from './payday-disbursement-status.page';

describe('PaydayDisbursementStatusPage', () => {
  let component: PaydayDisbursementStatusPage;
  let fixture: ComponentFixture<PaydayDisbursementStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydayDisbursementStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaydayDisbursementStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
