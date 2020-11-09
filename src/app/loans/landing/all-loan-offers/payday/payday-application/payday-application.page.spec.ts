import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaydayApplicationPage } from './payday-application.page';

describe('PaydayApplicationPage', () => {
  let component: PaydayApplicationPage;
  let fixture: ComponentFixture<PaydayApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydayApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaydayApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
