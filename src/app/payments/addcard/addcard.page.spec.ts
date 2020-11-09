import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcardPage } from './addcard.page';

describe('AddcardPage', () => {
  let component: AddcardPage;
  let fixture: ComponentFixture<AddcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
