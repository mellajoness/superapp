import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupTypePage } from './group-type.page';

describe('GroupTypePage', () => {
  let component: GroupTypePage;
  let fixture: ComponentFixture<GroupTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
