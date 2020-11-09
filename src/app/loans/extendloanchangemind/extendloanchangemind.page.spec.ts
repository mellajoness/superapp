import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendloanchangemindPage } from './extendloanchangemind.page';

describe('ExtendloanchangemindPage', () => {
  let component: ExtendloanchangemindPage;
  let fixture: ComponentFixture<ExtendloanchangemindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendloanchangemindPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendloanchangemindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
