import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayloansuccessmodalComponent } from './payloansuccessmodal.component';

describe('PayloansuccessmodalComponent', () => {
  let component: PayloansuccessmodalComponent;
  let fixture: ComponentFixture<PayloansuccessmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloansuccessmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayloansuccessmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
