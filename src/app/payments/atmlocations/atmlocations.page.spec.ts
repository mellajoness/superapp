import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtmlocationsPage } from './atmlocations.page';

describe('AtmlocationsPage', () => {
  let component: AtmlocationsPage;
  let fixture: ComponentFixture<AtmlocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmlocationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtmlocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
