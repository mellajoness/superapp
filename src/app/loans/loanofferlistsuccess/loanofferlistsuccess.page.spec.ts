import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanofferlistsuccessPage } from './loanofferlistsuccess.page';

describe('LoanofferlistsuccessPage', () => {
  let component: LoanofferlistsuccessPage;
  let fixture: ComponentFixture<LoanofferlistsuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanofferlistsuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanofferlistsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
