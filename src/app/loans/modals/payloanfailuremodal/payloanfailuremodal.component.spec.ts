import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayloanfailuremodalComponent } from './payloanfailuremodal.component';

describe('PayloanfailuremodalComponent', () => {
  let component: PayloanfailuremodalComponent;
  let fixture: ComponentFixture<PayloanfailuremodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloanfailuremodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayloanfailuremodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
