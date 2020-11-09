import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExitappComponent } from './exitapp.component';

describe('ExitappComponent', () => {
  let component: ExitappComponent;
  let fixture: ComponentFixture<ExitappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitappComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExitappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
