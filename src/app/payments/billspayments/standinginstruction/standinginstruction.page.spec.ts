import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StandinginstructionPage } from './standinginstruction.page';

describe('StandinginstructionPage', () => {
  let component: StandinginstructionPage;
  let fixture: ComponentFixture<StandinginstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandinginstructionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StandinginstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
