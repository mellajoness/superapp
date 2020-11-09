import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanhistoryPage } from './loanhistory.page';

describe('LoanhistoryPage', () => {
  let component: LoanhistoryPage;
  let fixture: ComponentFixture<LoanhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
