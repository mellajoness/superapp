import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendloanchangeminddetailsPage } from './extendloanchangeminddetails.page';

describe('ExtendloanchangeminddetailsPage', () => {
  let component: ExtendloanchangeminddetailsPage;
  let fixture: ComponentFixture<ExtendloanchangeminddetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendloanchangeminddetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendloanchangeminddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
