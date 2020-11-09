import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanofferlistsecondPage } from './loanofferlistsecond.page';

describe('LoanofferlistsecondPage', () => {
  let component: LoanofferlistsecondPage;
  let fixture: ComponentFixture<LoanofferlistsecondPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanofferlistsecondPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanofferlistsecondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
