import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaydayConfirmApplicationPage } from './payday-confirm-application.page';

describe('PaydayConfirmApplicationPage', () => {
  let component: PaydayConfirmApplicationPage;
  let fixture: ComponentFixture<PaydayConfirmApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydayConfirmApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaydayConfirmApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
