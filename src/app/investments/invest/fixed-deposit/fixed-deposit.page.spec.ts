import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FixedDepositPage } from './fixed-deposit.page';

describe('FixedDepositPage', () => {
  let component: FixedDepositPage;
  let fixture: ComponentFixture<FixedDepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FixedDepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
