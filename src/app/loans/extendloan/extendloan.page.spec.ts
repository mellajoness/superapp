import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendloanPage } from './extendloan.page';

describe('ExtendloanPage', () => {
  let component: ExtendloanPage;
  let fixture: ComponentFixture<ExtendloanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendloanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendloanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
