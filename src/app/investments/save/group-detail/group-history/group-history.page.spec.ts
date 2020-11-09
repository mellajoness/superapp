import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupHistoryPage } from './group-history.page';

describe('GroupHistoryPage', () => {
  let component: GroupHistoryPage;
  let fixture: ComponentFixture<GroupHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
