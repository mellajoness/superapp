import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigosnewcardPage } from './migosnewcard.page';

describe('MigosnewcardPage', () => {
  let component: MigosnewcardPage;
  let fixture: ComponentFixture<MigosnewcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigosnewcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigosnewcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
