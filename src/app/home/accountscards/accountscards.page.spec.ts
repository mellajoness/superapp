import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountscardsPage } from './accountscards.page';

describe('AccountscardsPage', () => {
  let component: AccountscardsPage;
  let fixture: ComponentFixture<AccountscardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountscardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountscardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
