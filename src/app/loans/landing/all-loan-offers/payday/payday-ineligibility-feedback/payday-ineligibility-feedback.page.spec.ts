import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaydayIneligibilityFeedbackPage } from './payday-ineligibility-feedback.page';

describe('PaydayIneligibilityFeedbackPage', () => {
  let component: PaydayIneligibilityFeedbackPage;
  let fixture: ComponentFixture<PaydayIneligibilityFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydayIneligibilityFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaydayIneligibilityFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
