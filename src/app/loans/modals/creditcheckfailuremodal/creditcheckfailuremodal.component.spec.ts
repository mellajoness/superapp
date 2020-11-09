import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditcheckfailuremodalComponent } from './creditcheckfailuremodal.component';

describe('CreditcheckfailuremodalComponent', () => {
  let component: CreditcheckfailuremodalComponent;
  let fixture: ComponentFixture<CreditcheckfailuremodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditcheckfailuremodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditcheckfailuremodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
