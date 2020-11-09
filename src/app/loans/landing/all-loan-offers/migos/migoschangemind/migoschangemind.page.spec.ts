import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigoschangemindPage } from './migoschangemind.page';

describe('MigoschangemindPage', () => {
  let component: MigoschangemindPage;
  let fixture: ComponentFixture<MigoschangemindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigoschangemindPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigoschangemindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
