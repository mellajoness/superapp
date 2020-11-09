import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardOrTokenPage } from './card-or-token.page';

describe('CardOrTokenPage', () => {
  let component: CardOrTokenPage;
  let fixture: ComponentFixture<CardOrTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardOrTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
