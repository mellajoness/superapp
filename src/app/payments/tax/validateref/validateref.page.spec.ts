import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidaterefPage } from './validateref.page';

describe('ValidaterefPage', () => {
  let component: ValidaterefPage;
  let fixture: ComponentFixture<ValidaterefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaterefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaterefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
