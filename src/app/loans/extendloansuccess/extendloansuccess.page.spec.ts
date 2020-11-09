import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendloansuccessPage } from './extendloansuccess.page';

describe('ExtendloansuccessPage', () => {
  let component: ExtendloansuccessPage;
  let fixture: ComponentFixture<ExtendloansuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendloansuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendloansuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
