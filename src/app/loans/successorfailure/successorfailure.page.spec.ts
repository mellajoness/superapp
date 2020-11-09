import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessorfailurePage } from './successorfailure.page';

describe('SuccessorfailurePage', () => {
  let component: SuccessorfailurePage;
  let fixture: ComponentFixture<SuccessorfailurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessorfailurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessorfailurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
