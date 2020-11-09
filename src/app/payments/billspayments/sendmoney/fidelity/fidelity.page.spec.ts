import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FidelityPage } from './fidelity.page';

describe('FidelityPage', () => {
  let component: FidelityPage;
  let fixture: ComponentFixture<FidelityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FidelityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
