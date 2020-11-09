import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComingsoonPage } from './comingsoon.page';

describe('ComingsoonPage', () => {
  let component: ComingsoonPage;
  let fixture: ComponentFixture<ComingsoonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComingsoonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComingsoonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
