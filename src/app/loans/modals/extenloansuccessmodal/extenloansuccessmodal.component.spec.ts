import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtenloansuccessmodalComponent } from './extenloansuccessmodal.component';

describe('ExtenloansuccessmodalComponent', () => {
  let component: ExtenloansuccessmodalComponent;
  let fixture: ComponentFixture<ExtenloansuccessmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtenloansuccessmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtenloansuccessmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
