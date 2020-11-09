import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BvnPage } from './bvn.page';

describe('BvnPage', () => {
  let component: BvnPage;
  let fixture: ComponentFixture<BvnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BvnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
