import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WastemanagementPage } from './wastemanagement.page';

describe('WastemanagementPage', () => {
  let component: WastemanagementPage;
  let fixture: ComponentFixture<WastemanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastemanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WastemanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
