import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrpJoinChlngPage } from './grp-join-chlng.page';

describe('GrpJoinChlngPage', () => {
  let component: GrpJoinChlngPage;
  let fixture: ComponentFixture<GrpJoinChlngPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrpJoinChlngPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrpJoinChlngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
