import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MigoscardPage } from './migoscard.page';

describe('MigoscardPage', () => {
  let component: MigoscardPage;
  let fixture: ComponentFixture<MigoscardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigoscardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MigoscardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
