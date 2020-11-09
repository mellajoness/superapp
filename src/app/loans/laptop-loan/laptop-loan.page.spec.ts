import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaptopLoanPage } from './laptop-loan.page';

describe('LaptopLoanPage', () => {
  let component: LaptopLoanPage;
  let fixture: ComponentFixture<LaptopLoanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopLoanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaptopLoanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
