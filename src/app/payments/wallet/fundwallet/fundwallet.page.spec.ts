import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundwalletPage } from './fundwallet.page';

describe('FundwalletPage', () => {
  let component: FundwalletPage;
  let fixture: ComponentFixture<FundwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundwalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
