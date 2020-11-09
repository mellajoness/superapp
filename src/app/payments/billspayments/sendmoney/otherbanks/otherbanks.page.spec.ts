import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherbanksPage } from './otherbanks.page';

describe('OtherbanksPage', () => {
  let component: OtherbanksPage;
  let fixture: ComponentFixture<OtherbanksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherbanksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherbanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
