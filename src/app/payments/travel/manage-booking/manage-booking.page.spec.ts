import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageBookingPage } from './manage-booking.page';

describe('ManageBookingPage', () => {
  let component: ManageBookingPage;
  let fixture: ComponentFixture<ManageBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
