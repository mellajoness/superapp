import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NextofkinPage } from './nextofkin.page';

describe('NextofkinPage', () => {
  let component: NextofkinPage;
  let fixture: ComponentFixture<NextofkinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextofkinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NextofkinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
