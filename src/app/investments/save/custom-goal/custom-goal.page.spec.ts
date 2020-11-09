import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomGoalPage } from './custom-goal.page';

describe('CustomGoalPage', () => {
  let component: CustomGoalPage;
  let fixture: ComponentFixture<CustomGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
