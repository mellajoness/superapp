import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigosPage } from './migos.page';

describe('MigosPage', () => {
  let component: MigosPage;
  let fixture: ComponentFixture<MigosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
