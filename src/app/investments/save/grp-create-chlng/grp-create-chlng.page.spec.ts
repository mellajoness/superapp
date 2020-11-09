import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrpCreateChlngPage } from './grp-create-chlng.page';

describe('GrpCreateChlngPage', () => {
  let component: GrpCreateChlngPage;
  let fixture: ComponentFixture<GrpCreateChlngPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrpCreateChlngPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrpCreateChlngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
