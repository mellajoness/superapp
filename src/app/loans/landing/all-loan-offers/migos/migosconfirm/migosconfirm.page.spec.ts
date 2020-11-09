import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigosconfirmPage } from './migosconfirm.page';

describe('MigosconfirmPage', () => {
  let component: MigosconfirmPage;
  let fixture: ComponentFixture<MigosconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigosconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigosconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
