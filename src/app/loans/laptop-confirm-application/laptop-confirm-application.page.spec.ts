import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaptopConfirmApplicationPage } from './laptop-confirm-application.page';

describe('LaptopConfirmApplicationPage', () => {
  let component: LaptopConfirmApplicationPage;
  let fixture: ComponentFixture<LaptopConfirmApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopConfirmApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaptopConfirmApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
