import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupsavingsChlngPage } from './groupsavings-chlng.page';

describe('GroupsavingsChlngPage', () => {
  let component: GroupsavingsChlngPage;
  let fixture: ComponentFixture<GroupsavingsChlngPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsavingsChlngPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsavingsChlngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
