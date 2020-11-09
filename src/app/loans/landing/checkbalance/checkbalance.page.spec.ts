import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckbalancePage } from './checkbalance.page';

describe('CheckbalancePage', () => {
  let component: CheckbalancePage;
  let fixture: ComponentFixture<CheckbalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
