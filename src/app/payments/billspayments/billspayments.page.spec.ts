import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillspaymentsPage } from './billspayments.page';

describe('BillspaymentsPage', () => {
  let component: BillspaymentsPage;
  let fixture: ComponentFixture<BillspaymentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillspaymentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillspaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
