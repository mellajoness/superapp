import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanofferlistfirstPage } from './loanofferlistfirst.page';

describe('LoanofferlistfirstPage', () => {
  let component: LoanofferlistfirstPage;
  let fixture: ComponentFixture<LoanofferlistfirstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanofferlistfirstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanofferlistfirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
