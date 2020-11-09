import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigoscardpaymentPage } from './migoscardpayment.page';

describe('MigoscardpaymentPage', () => {
  let component: MigoscardpaymentPage;
  let fixture: ComponentFixture<MigoscardpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigoscardpaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigoscardpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
