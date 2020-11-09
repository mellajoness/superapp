import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalloanhistoryPage } from './personalloanhistory.page';

describe('PersonalloanhistoryPage', () => {
  let component: PersonalloanhistoryPage;
  let fixture: ComponentFixture<PersonalloanhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalloanhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalloanhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
