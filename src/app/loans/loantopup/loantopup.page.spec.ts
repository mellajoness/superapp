import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoantopupPage } from './loantopup.page';

describe('LoantopupPage', () => {
  let component: LoantopupPage;
  let fixture: ComponentFixture<LoantopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoantopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
