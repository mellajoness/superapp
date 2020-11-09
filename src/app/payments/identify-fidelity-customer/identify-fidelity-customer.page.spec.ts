import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentifyFidelityCustomerPage } from './identify-fidelity-customer.page';

describe('IdentifyFidelityCustomerPage', () => {
  let component: IdentifyFidelityCustomerPage;
  let fixture: ComponentFixture<IdentifyFidelityCustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyFidelityCustomerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentifyFidelityCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
