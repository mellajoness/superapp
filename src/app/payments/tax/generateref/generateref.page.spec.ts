import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneraterefPage } from './generateref.page';

describe('GeneraterefPage', () => {
  let component: GeneraterefPage;
  let fixture: ComponentFixture<GeneraterefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraterefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneraterefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
