import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresetGoalPage } from './preset-goal.page';

describe('PresetGoalPage', () => {
  let component: PresetGoalPage;
  let fixture: ComponentFixture<PresetGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresetGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
