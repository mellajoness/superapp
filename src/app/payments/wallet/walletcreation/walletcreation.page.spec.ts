import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletcreationPage } from './walletcreation.page';

describe('WalletcreationPage', () => {
  let component: WalletcreationPage;
  let fixture: ComponentFixture<WalletcreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletcreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletcreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
