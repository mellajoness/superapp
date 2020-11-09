import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavingsTypePage } from './savings-type.page';

describe('SavingsTypePage', () => {
  let component: SavingsTypePage;
  let fixture: ComponentFixture<SavingsTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
