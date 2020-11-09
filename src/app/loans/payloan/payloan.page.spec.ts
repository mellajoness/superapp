import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayloanPage } from './payloan.page';

describe('PayloanPage', () => {
  let component: PayloanPage;
  let fixture: ComponentFixture<PayloanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayloanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
